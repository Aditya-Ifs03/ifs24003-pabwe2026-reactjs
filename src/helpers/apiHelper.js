// Menentukan BASE_URL dengan fallback otomatis ke URL Delcom jika Environment Variable tidak terbaca
export const BASE_URL = 
  import.meta.env.VITE_DELCOM_BASEURL || 
  import.meta.env.DELCOM_BASEURL || 
  'https://open-api.delcom.org/api/v1';

/**
 * Helper dasar untuk melakukan HTTP Request ke API
 */
export const fetchWithConfig = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  // Memastikan endpoint diawali dengan /
  const formattedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  const response = await fetch(`${BASE_URL}${formattedEndpoint}`, {
    ...options,
    headers,
  });

  // Mencegah error Parsing JSON jika server mengembalikan halaman HTML
  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    throw new Error('Server mengembalikan respon non-JSON. Pastikan URL API sudah benar.');
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Terjadi kesalahan pada request.');
  }

  return data;
};