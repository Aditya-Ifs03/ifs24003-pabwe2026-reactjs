import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../../../hooks/useInput';
import { 
  asyncGetProfile, 
  asyncUpdateProfile, 
  asyncUpdateProfilePhoto, 
  asyncUpdatePassword 
} from '../states/userSlice';
import { IconUpload, IconUser } from '@tabler/icons-react';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { profile, isProfile, isChangeProfile, isChangeProfilePhoto, isChangeProfilePassword } = useSelector((state) => state.users);

  // States untuk update profile
  const [name, handleNameChange, setName] = useInput('');
  const [email, handleEmailChange, setEmail] = useInput('');
  
  // States untuk update password
  const [oldPassword, handleOldPasswordChange, setOldPassword] = useInput('');
  const [newPassword, handleNewPasswordChange, setNewPassword] = useInput('');
  
  // State untuk photo upload
  const [photoFile, setPhotoFile] = useState(null);

  useEffect(() => {
    if (!profile && isProfile === 'idle') {
      dispatch(asyncGetProfile());
    }
  }, [dispatch, profile, isProfile]);

  useEffect(() => {
    if (profile) {
      setName(profile.name || '');
      setEmail(profile.email || '');
    }
  }, [profile, setName, setEmail]);

  const onUpdateProfile = (e) => {
    e.preventDefault();
    dispatch(asyncUpdateProfile({ name, email }));
  };

  const onUpdatePhoto = (e) => {
    e.preventDefault();
    if (!photoFile) return;
    const formData = new FormData();
    formData.append('photo', photoFile);
    dispatch(asyncUpdateProfilePhoto(formData));
    setPhotoFile(null); // Reset form setelah submit
  };

  const onUpdatePassword = (e) => {
    e.preventDefault();
    dispatch(asyncUpdatePassword({ old_password: oldPassword, new_password: newPassword }))
      .then(() => {
        setOldPassword('');
        setNewPassword('');
      });
  };

  if (isProfile === 'pending' || !profile) return <div className="p-6">Memuat profil...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">Pengaturan Profil</h1>

      {/* Bagian Ubah Foto Profil */}
      <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold mb-4">Foto Profil</h2>
        <div className="flex items-center space-x-6">
          <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center text-gray-500">
             {profile.photo ? <img src={profile.photo} alt="Avatar" className="w-full h-full object-cover" /> : <IconUser size={48} />}
          </div>
          <form onSubmit={onUpdatePhoto} className="flex-1 space-y-3">
            <input 
              type="file" 
              accept="image/png, image/jpeg, image/jpg"
              onChange={(e) => setPhotoFile(e.target.files[0])}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <button 
              type="submit" 
              disabled={!photoFile || isChangeProfilePhoto === 'pending'}
              className="flex items-center space-x-2 bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900 disabled:opacity-50"
            >
              <IconUpload size={18} />
              <span>{isChangeProfilePhoto === 'pending' ? 'Mengunggah...' : 'Unggah Foto'}</span>
            </button>
          </form>
        </div>
      </section>

      {/* Bagian Ubah Informasi Dasar */}
      <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold mb-4">Informasi Akun</h2>
        <form onSubmit={onUpdateProfile} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
            <input type="text" value={name} onChange={handleNameChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" value={email} onChange={handleEmailChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
          </div>
          <button type="submit" disabled={isChangeProfile === 'pending'} className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50">
            {isChangeProfile === 'pending' ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
        </form>
      </section>

      {/* Bagian Ganti Kata Sandi */}
      <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold mb-4">Ganti Kata Sandi</h2>
        <form onSubmit={onUpdatePassword} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Kata Sandi Lama</label>
            <input type="password" value={oldPassword} onChange={handleOldPasswordChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Kata Sandi Baru</label>
            <input type="password" value={newPassword} onChange={handleNewPasswordChange} required minLength={6} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
          </div>
          <button type="submit" disabled={isChangeProfilePassword === 'pending' || !oldPassword || !newPassword} className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 disabled:opacity-50">
            {isChangeProfilePassword === 'pending' ? 'Memproses...' : 'Ubah Kata Sandi'}
          </button>
        </form>
      </section>

    </div>
  );
};

export default ProfilePage;