import { apiFetch, getAccessToken } from '../../../helpers/apiHelper';

export const getAllUsers = async () => {
  return await apiFetch('/users', { method: 'GET' });
};

export const getProfile = async () => {
  return await apiFetch('/users/me', { method: 'GET' });
};

export const updateProfile = async (data) => {
  return await apiFetch('/users/me', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

export const updateProfilePhoto = async (formData) => {
  const token = getAccessToken();
  // Khusus FormData, kita tidak menggunakan apiFetch agar Content-Type bawaan FormData tidak tertimpa
  const response = await fetch(`${DELCOM_BASEURL}/users/me/photo`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  });
  
  const responseJson = await response.json();
  if (!response.ok) throw new Error(responseJson.message || 'Gagal mengunggah foto');
  return responseJson;
};

export const updatePassword = async (data) => {
  return await apiFetch('/users/me/password', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};