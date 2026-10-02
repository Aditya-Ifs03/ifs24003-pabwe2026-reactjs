import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import useInput from '../../../hooks/useInput';
import { asyncAuthRegister, resetAuthStates } from '../states/authSlice';
import { showSuccessDialog } from '../../../helpers/toolsHelper';

const RegisterPage = () => {
  const [name, handleNameChange] = useInput('');
  const [email, handleEmailChange] = useInput('');
  const [password, handlePasswordChange] = useInput('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthRegister } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthRegister === 'success') {
      showSuccessDialog('Registrasi Berhasil! Silakan Login.');
      dispatch(resetAuthStates());
      navigate('/auth/login');
    }
  }, [isAuthRegister, navigate, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(asyncAuthRegister({ name, email, password }));
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Daftar Akun</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
          <input 
            type="text" 
            value={name} 
            onChange={handleNameChange} 
            required 
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 border" 
            placeholder="Masukkan nama"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={handleEmailChange} 
            required 
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 border" 
            placeholder="email@contoh.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Kata Sandi</label>
          <input 
            type="password" 
            value={password} 
            onChange={handlePasswordChange} 
            required 
            minLength={6}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 border" 
            placeholder="Minimal 6 karakter"
          />
        </div>
        <button 
          type="submit" 
          disabled={isAuthRegister === 'pending'}
          className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
        >
          {isAuthRegister === 'pending' ? 'Mendaftar...' : 'Daftar'}
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        Sudah punya akun? <Link to="/auth/login" className="text-blue-600 font-medium hover:underline">Masuk di sini</Link>
      </p>
    </div>
  );
};

export default RegisterPage;