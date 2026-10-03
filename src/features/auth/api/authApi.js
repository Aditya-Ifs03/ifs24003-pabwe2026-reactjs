import { BASE_URL } from '../../../helpers/apiHelper';

/**
 * API untuk Register Akun Baru
 */
export const registerApi = async (payload) => {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    throw new Error('Gagal terhubung ke API backend. Silakan coba beberapa saat lagi.');
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Pendaftaran gagal.');
  }

  return data;
};

/**
 * API untuk Login Akun
 */
export const loginApi = async (credentials) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    throw new Error('Gagal terhubung ke API backend.');
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Login gagal.');
  }

  return data;
};