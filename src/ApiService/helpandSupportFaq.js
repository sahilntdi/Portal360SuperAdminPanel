import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
  patchRequest,
} from "./httpHelpers";


// GET ALL
export const getSupportFaqs = () => {
  return getRequest("/support-faqs");
};

// CREATE
export const createSupportFaq = (payload) => {
  return postRequest("/support-faqs", payload);
};

// UPDATE
export const updateSupportFaq = (id, payload) => {
  return putRequest(`/support-faqs/${id}`, payload);
};

// DELETE
export const deleteSupportFaq = (id) => {
  return deleteRequest(`/support-faqs/${id}`);
};

// GET ALL FEEDBACK
export const getFeedbacks = () => {
  return getRequest("/feedback");
};

// UPDATE FEEDBACK STATUS
export const updateFeedbackStatus = (id, status) => {
  return patchRequest(`/feedback/${id}/status`, { status });
};

// UPDATE FEEDBACK (message, adminNote, status)
export const updateFeedback = (id, payload) => {
  return patchRequest(`/feedback/${id}`, payload);
};

// OPTIONAL: DELETE FEEDBACK
export const deleteFeedback = (id) => {
  return deleteRequest(`/feedback/${id}`);
};