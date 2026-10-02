export const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

export const putAccessToken = (token) => {
  if (token) {
    localStorage.setItem('accessToken', token);
  } else {
    localStorage.removeItem('accessToken');
  }
};

export const apiFetch = async (endpoint, options = {}) => {
  const token = getAccessToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Menggunakan konstanta DELCOM_BASEURL yang telah didefinisikan di vite.config.js
  const url = `${DELCOM_BASEURL}${endpoint}`;

  try {
    const response = await fetch(url, { ...options, headers });
    const responseJson = await response.json();

    if (!response.ok) {
      throw new Error(responseJson.message || 'Terjadi kesalahan pada server');
    }

    return responseJson;
  } catch (error) {
    throw error;
  }
};