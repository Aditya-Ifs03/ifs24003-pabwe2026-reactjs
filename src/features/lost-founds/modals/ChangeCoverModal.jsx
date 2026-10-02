import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncUpdateCover, asyncGetLostFoundById, resetActionStates } from '../states/lostFoundSlice';
import { IconX } from '@tabler/icons-react';

const ChangeCoverModal = ({ isOpen, onClose, lostFoundId }) => {
  const [photoFile, setPhotoFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const dispatch = useDispatch();
  const { isLostFoundChangeCover } = useSelector((state) => state.lostFound);

  useEffect(() => {
    if (isLostFoundChangeCover === 'success') {
      dispatch(resetActionStates());
      dispatch(asyncGetLostFoundById(lostFoundId)); // Refresh detail
      setPhotoFile(null);
      setPreview(null);
      onClose();
    }
  }, [isLostFoundChangeCover, dispatch, onClose, lostFoundId]);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!photoFile) return;
    const formData = new FormData();
    formData.append('cover', photoFile);
    dispatch(asyncUpdateCover({ id: lostFoundId, formData }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><IconX /></button>
        <h2 className="text-xl font-bold mb-4">Ubah Foto Cover</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          {preview && (
             <div className="w-full h-48 bg-gray-100 rounded-md overflow-hidden mb-4">
               <img src={preview} alt="Preview" className="w-full h-full object-cover" />
             </div>
          )}
          <input type="file" accept="image/*" onChange={handleFileChange} required className="w-full p-2 border rounded-md" />
          <button type="submit" disabled={isLostFoundChangeCover === 'pending' || !photoFile} className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50">
            {isLostFoundChangeCover === 'pending' ? 'Mengunggah...' : 'Unggah Cover'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangeCoverModal;