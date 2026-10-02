import { apiFetch, getAccessToken } from '../../../helpers/apiHelper';

export const getLostFounds = async (query = '') => {
  return await apiFetch(`/lost-founds${query}`, { method: 'GET' });
};

export const getLostFoundById = async (id) => {
  return await apiFetch(`/lost-founds/${id}`, { method: 'GET' });
};

export const createLostFound = async (data) => {
  return await apiFetch('/lost-founds', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const updateLostFound = async (id, data) => {
  return await apiFetch(`/lost-founds/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

export const updateLostFoundCover = async (id, formData) => {
  const token = getAccessToken();
  const response = await fetch(`${DELCOM_BASEURL}/lost-founds/${id}/cover`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
    body: formData,
  });
  const responseJson = await response.json();
  if (!response.ok) throw new Error(responseJson.message || 'Gagal mengubah cover');
  return responseJson;
};

export const deleteLostFound = async (id) => {
  return await apiFetch(`/lost-founds/${id}`, { method: 'DELETE' });
};

export const getDailyStats = async () => {
  return await apiFetch('/lost-founds/stats/daily', { method: 'GET' });
};

export const getMonthlyStats = async () => {
  return await apiFetch('/lost-founds/stats/monthly', { method: 'GET' });
};