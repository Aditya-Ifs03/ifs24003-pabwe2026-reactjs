// URL Base Backend Open API Delcom (dengan Fallback Otomatis)
export const BASE_URL =
  import.meta.env.VITE_DELCOM_BASEURL ||
  import.meta.env.DELCOM_BASEURL ||
  'https://open-api.delcom.org/api/v1';

/**
 * Helper umum untuk request API dengan validasi respons JSON
 */
export const fetchWithConfig = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const formattedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const fullUrl = `${BASE_URL}${formattedEndpoint}`;

  const response = await fetch(fullUrl, {
    ...options,
    headers,
  });

  // Mencegah error Parsing JSON jika server hosting mengembalikan file HTML
  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    throw new Error(
      `Gagal terhubung ke API Delcom. Server mengembalikan respon non-JSON (${response.status}).`
    );
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Terjadi kesalahan pada request API.');
  }

  return data;
};