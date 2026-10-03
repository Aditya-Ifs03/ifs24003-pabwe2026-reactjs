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

  const { loading, error, successMessage } = useSelector((state) => state.auth || {});

  useEffect(() => {
    if (dispatch && resetAuthStates) {
      dispatch(resetAuthStates());
    }
  }, [dispatch]);

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

    if (!name || !email || !password) {
      if (showErrorDialog) {
        showErrorDialog('Semua kolom wajib diisi!');
      } else {
        alert('Semua kolom wajib diisi!');
      }
      return;
    }

    dispatch(asyncAuthRegister({ name, email, password }));
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <header>
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Daftar Akun
          </h1>
        </header>

        <form onSubmit={onSubmitHandler} className="space-y-4" aria-label="Form Pendaftaran">
          <div>
            <label htmlFor="register-name-input" className="block text-sm font-medium text-gray-700 mb-1">
              Nama Lengkap
            </label>
            <input
              id="register-name-input"
              type="text"
              value={name}
              onChange={onNameChange}
              placeholder="Masukkan nama lengkap"
              required
              aria-required="true"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label htmlFor="register-email-input" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="register-email-input"
              type="email"
              value={email}
              onChange={onEmailChange}
              placeholder="nama@gmail.com"
              required
              aria-required="true"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label htmlFor="register-password-input" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="register-password-input"
              type="password"
              value={password}
              onChange={onPasswordChange}
              placeholder="••••••••"
              required
              aria-required="true"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            id="register-submit-button"
            type="submit"
            disabled={loading}
            aria-label="Tombol Daftar Akun"
            className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'Memproses...' : 'Daftar'}
          </button>
        </form>

        <nav aria-label="Navigasi Login" className="mt-4 text-center text-sm text-gray-600">
          <p>
            Sudah punya akun?{' '}
            <Link to="/auth/login" className="text-blue-600 hover:underline">
              Masuk di sini
            </Link>
          </p>
        </nav>
      </div>
    </main>
  );
};

export default RegisterPage;