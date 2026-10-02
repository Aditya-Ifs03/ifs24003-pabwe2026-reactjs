import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../../../hooks/useInput';
import { asyncCreateLostFound, asyncGetLostFounds, resetActionStates } from '../states/lostFoundSlice';
import { IconX } from '@tabler/icons-react';

const AddModal = ({ isOpen, onClose }) => {
  const [title, handleTitleChange, setTitle] = useInput('');
  const [description, handleDescriptionChange, setDescription] = useInput('');
  const [status, handleStatusChange, setStatus] = useInput('lost');
  const dispatch = useDispatch();
  const { isLostFoundAdd } = useSelector((state) => state.lostFound);

  useEffect(() => {
    if (isLostFoundAdd === 'success') {
      dispatch(resetActionStates());
      dispatch(asyncGetLostFounds('')); // Refresh data
      setTitle('');
      setDescription('');
      onClose();
    }
  }, [isLostFoundAdd, dispatch, onClose, setTitle, setDescription]);

  if (!isOpen) return null;

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(asyncCreateLostFound({ title, description, status }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <IconX />
        </button>
        <h2 className="text-xl font-bold mb-4">Tambah Laporan Baru</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Judul Barang</label>
            <input type="text" value={title} onChange={handleTitleChange} required className="w-full p-2 border rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Deskripsi</label>
            <textarea value={description} onChange={handleDescriptionChange} required rows="3" className="w-full p-2 border rounded-md"></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Jenis Laporan</label>
            <select value={status} onChange={handleStatusChange} className="w-full p-2 border rounded-md">
              <option value="lost">Kehilangan (Lost)</option>
              <option value="found">Menemukan (Found)</option>
            </select>
          </div>
          <button type="submit" disabled={isLostFoundAdd === 'pending'} className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50">
            {isLostFoundAdd === 'pending' ? 'Menyimpan...' : 'Simpan Laporan'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddModal;