import api from "../utils/axios";

export const getRequest = async (url) => {
  try {
    const res = await api.get(url);
    return res.data;
  } catch (error) {
    console.error(`❌ Error in GET ${url}:`, error);
    throw error.response?.data || error.message;
  }
};

export const postRequest = async (url, payload = {}) => {
  try {
    const res = await api.post(url, payload);
    return res.data;
  } catch (error) {
    console.error(`❌ Error in POST ${url}:`, error);
    throw error.response?.data || error.message;
  }
};

export const patchRequest = async (url, payload = {}) => {
  try {
    const res = await api.patch(url, payload);
    return res.data;
  } catch (error) {
    console.error(`❌ Error in PATCH ${url}:`, error);
    throw error.response?.data || error.message;
  }
};

export const putRequest = async(url, payload ={})=>{
  try {
    const res = await api.put(url, payload);
    return res.data;
  } catch (error) {
    console.error(`❌ Error in PUT ${url}:`, error);
    throw error.response?.data || error.message;
  }
}

export const deleteRequest = async (url, payload = {}) => {
  const res = await api.delete(url, { data: payload });
  return res.data;
};
