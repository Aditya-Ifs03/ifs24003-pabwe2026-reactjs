// Memastikan BASE_URL adalah string URL bersih tanpa tanda [ ]
export const BASE_URL = 'https://open-api.delcom.org/api/v1';

export const getAccessToken = () => {
  return localStorage.getItem('token') || localStorage.getItem('accessToken');
};

export const apiFetch = async (endpoint, options = {}) => {
  const token = getAccessToken();

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const formattedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const response = await fetch(`${BASE_URL}${formattedEndpoint}`, {
    ...options,
    headers,
  });

  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    throw new Error('Gagal terhubung ke API Delcom. Respons server bukan JSON.');
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Terjadi kesalahan pada request API.');
  }

  return data;
};

export const fetchWithConfig = apiFetch;