import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { asyncGetLostFoundById, asyncDeleteLostFound } from '../states/lostFoundSlice';
import { showConfirmDialog, formatDate } from '../../../helpers/toolsHelper';
import ChangeCoverModal from '../modals/ChangeCoverModal';
// Import ChangeModal jika sudah diimplementasikan serupa dengan AddModal
import { IconPhotoEdit, IconTrash } from '@tabler/icons-react';

const DetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { lostFound, isLostFound } = useSelector((state) => state.lostFound);
  const [isCoverModalOpen, setIsCoverModalOpen] = useState(false);

  useEffect(() => {
    dispatch(asyncGetLostFoundById(id));
  }, [dispatch, id]);

  const handleDelete = async () => {
    const confirm = await showConfirmDialog('Hapus Laporan', 'Yakin ingin menghapus laporan ini?');
    if (confirm.isConfirmed) {
      dispatch(asyncDeleteLostFound(id)).then(() => navigate('/'));
    }
  };

  if (isLostFound === 'pending' || !lostFound) return <div className="p-6">Memuat rincian...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Cover Rasio Adaptif */}
        <div className="w-full h-64 bg-gray-200 relative group">
          {lostFound.cover ? (
            <img src={lostFound.cover} alt="Cover" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">Belum ada foto cover</div>
          )}
          {/* Tampilkan aksi jika is_me = 1 (milik pengguna saat ini) */}
          {lostFound.is_me === 1 && (
            <button onClick={() => setIsCoverModalOpen(true)} className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1.5 rounded-md flex items-center gap-2 hover:bg-black">
              <IconPhotoEdit size={18} /> Ubah Foto
            </button>
          )}
        </div>

        <div className="p-6 md:p-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{lostFound.title}</h1>
              <p className="text-sm text-gray-500">Dilaporkan oleh <span className="font-semibold text-gray-700">{lostFound.author?.name || 'Anonim'}</span> pada {formatDate(lostFound.created_at)}</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${lostFound.status === 'lost' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                {lostFound.status === 'lost' ? 'Kehilangan' : 'Ditemukan'}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${lostFound.is_completed ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>
                {lostFound.is_completed ? 'Selesai' : 'Aktif'}
              </span>
            </div>
          </div>

          <div className="prose max-w-none text-gray-700 mt-6">
            <h3 className="text-lg font-semibold mb-2">Deskripsi</h3>
            <p className="whitespace-pre-wrap">{lostFound.description}</p>
          </div>

          {lostFound.is_me === 1 && (
            <div className="mt-8 pt-6 border-t border-gray-100 flex gap-4">
              <button onClick={handleDelete} className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition">
                <IconTrash size={20} /> Hapus Laporan
              </button>
            </div>
          )}
        </div>
      </div>

      <ChangeCoverModal isOpen={isCoverModalOpen} onClose={() => setIsCoverModalOpen(false)} lostFoundId={lostFound.id} />
    </div>
  );
};

export default DetailPage;