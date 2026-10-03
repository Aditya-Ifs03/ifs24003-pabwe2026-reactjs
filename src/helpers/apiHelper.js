// URL Backend Open API Delcom
export const BASE_URL =
  import.meta.env.VITE_DELCOM_BASEURL ||
  import.meta.env.DELCOM_BASEURL ||
  'https://open-api.delcom.org/api/v1';

/**
 * Helper untuk mengambil Access Token dari LocalStorage
 */
export const getAccessToken = () => {
  return localStorage.getItem('token') || localStorage.getItem('accessToken');
};

/**
 * Helper utama pemanggilan API (apiFetch)
 */
export const apiFetch = async (endpoint, options = {}) => {
  const token = getAccessToken();

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

  // Memastikan respon yang diterima berbentuk JSON, bukan HTML fallback dari hosting
  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    throw new Error(
      `Gagal terhubung ke API Delcom. Respons server bukan JSON (${response.status}).`
    );
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Terjadi kesalahan pada request API.');
  }

  return data;
};

// Alias fetchWithConfig agar mendukung file lain yang menggunakan nama fungsi ini
export const fetchWithConfig = apiFetch;