import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
} from "./httpHelpers";

const BASE_URL = "/support-faqs";

// GET ALL
export const getSupportFaqs = () => {
  return getRequest(BASE_URL);
};

// CREATE
export const createSupportFaq = (payload) => {
  return postRequest(BASE_URL, payload);
};

// UPDATE
export const updateSupportFaq = (id, payload) => {
  return putRequest(`${BASE_URL}/${id}`, payload);
};

// DELETE
export const deleteSupportFaq = (id) => {
  return deleteRequest(`${BASE_URL}/${id}`);
};
