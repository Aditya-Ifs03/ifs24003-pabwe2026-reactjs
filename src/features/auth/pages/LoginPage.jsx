import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import useInput from '../../../hooks/useInput';
import { asyncAuthLogin, resetAuthStates } from '../states/authSlice';
import { showSuccessDialog, showErrorDialog } from '../../../helpers/toolsHelper';

const LoginPage = () => {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Mengambil state dari Redux authSlice
  const { token, user, loading, error } = useSelector((state) => state.auth || {});

  // Reset status pesan saat halaman dimuat
  useEffect(() => {
    if (dispatch && resetAuthStates) {
      dispatch(resetAuthStates());
    }
  }, [dispatch]);

  // Efek jika login berhasil (token/user terisi) atau gagal
  useEffect(() => {
    if (token || user) {
      if (showSuccessDialog) {
        showSuccessDialog('Login berhasil!');
      }
      if (dispatch && resetAuthStates) {
        dispatch(resetAuthStates());
      }
      // Arahkan ke halaman utama / dashboard setelah login
      navigate('/');
    }

    if (error) {
      if (showErrorDialog) {
        showErrorDialog(error);
      } else {
        alert(error);
      }
      if (dispatch && resetAuthStates) {
        dispatch(resetAuthStates());
      }
    }
  }, [token, user, error, dispatch, navigate]);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (!email || !password) {
      if (showErrorDialog) {
        showErrorDialog('Email dan Kata Sandi wajib diisi!');
      } else {
        alert('Email dan Kata Sandi wajib diisi!');
      }
      return;
    }

    // Kirim kredensial ke API Delcom
    dispatch(asyncAuthLogin({ email, password }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Masuk Akun</h2>

        <form onSubmit={onSubmitHandler} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={onEmailChange}
              placeholder="aditya@gmail.com"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kata Sandi
            </label>
            <input
              type="password"
              value={password}
              onChange={onPasswordChange}
              placeholder="••••••••"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'Memproses...' : 'Masuk'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Belum punya akun?{' '}
          <Link to="/auth/register" className="text-blue-600 hover:underline">
            Daftar sekarang
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;