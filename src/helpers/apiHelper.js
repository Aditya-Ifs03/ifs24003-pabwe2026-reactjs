// Hardcode BASE_URL langsung ke Server Open API Delcom
export const BASE_URL = 'https://open-api.delcom.org/api/v1';

/**
 * Helper umum untuk request API dengan Token Authorization
 */
export const fetchWithConfig = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');

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
    throw new Error('Server mengembalikan respon non-JSON. Pastikan endpoint API benar.');
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Terjadi kesalahan pada request API.');
  }

  return data;
};