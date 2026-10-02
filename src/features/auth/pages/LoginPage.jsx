import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import useInput from '../../../hooks/useInput';
import { asyncAuthLogin, resetAuthStates } from '../states/authSlice';
import { showSuccessDialog } from '../../../helpers/toolsHelper';

const LoginPage = () => {
  const [email, handleEmailChange] = useInput('');
  const [password, handlePasswordChange] = useInput('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthLogin } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthLogin === 'success') {
      showSuccessDialog('Login Berhasil!');
      dispatch(resetAuthStates());
      navigate('/');
    }
  }, [isAuthLogin, navigate, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(asyncAuthLogin({ email, password }));
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Masuk Akun</h2>
      <form onSubmit={onSubmit} className="space-y-4">
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
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 border" 
            placeholder="••••••••"
          />
        </div>
        <button 
          type="submit" 
          disabled={isAuthLogin === 'pending'}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {isAuthLogin === 'pending' ? 'Memproses...' : 'Masuk'}
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        Belum punya akun? <Link to="/auth/register" className="text-blue-600 font-medium hover:underline">Daftar sekarang</Link>
      </p>
    </div>
  );
};

export default LoginPage;