import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import useInput from '../../../hooks/useInput';
import { asyncAuthRegister, resetAuthStates } from '../states/authSlice';
import { showSuccessDialog, showErrorDialog } from '../../../helpers/toolsHelper';

const RegisterPage = () => {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Mengambil state dari Redux authSlice
  const { loading, error, successMessage } = useSelector((state) => state.auth || {});

  // Reset pesan status saat komponen dimuat pertama kali
  useEffect(() => {
    if (dispatch && resetAuthStates) {
      dispatch(resetAuthStates());
    }
  }, [dispatch]);

  // Efek ketika registrasi berhasil atau gagal
  useEffect(() => {
    if (successMessage) {
      if (showSuccessDialog) {
        showSuccessDialog(successMessage);
      } else {
        alert(successMessage);
      }
      dispatch(resetAuthStates());
      navigate('/auth/login');
    }

    if (error) {
      if (showErrorDialog) {
        showErrorDialog(error);
      } else {
        alert(error);
      }
      dispatch(resetAuthStates());
    }
  }, [successMessage, error, dispatch, navigate]);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    // Validasi sederhana sebelum kirim
    if (!name || !email || !password) {
      if (showErrorDialog) {
        showErrorDialog('Semua kolom wajib diisi!');
      } else {
        alert('Semua kolom wajib diisi!');
      }
      return;
    }

    // Kirim data registrasi
    dispatch(asyncAuthRegister({ name, email, password }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Daftar Akun</h2>

        <form onSubmit={onSubmitHandler} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama Lengkap
            </label>
            <input
              type="text"
              value={name}
              onChange={onNameChange}
              placeholder="Masukkan nama lengkap"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={onEmailChange}
              placeholder="nama@gmail.com"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={onPasswordChange}
              placeholder="••••••••"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? 'Memproses...' : 'Daftar'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Sudah punya akun?{' '}
          <Link to="/auth/login" className="text-blue-600 hover:underline">
            Masuk di sini
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;