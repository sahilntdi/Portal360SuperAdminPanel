import { getRequest, postRequest, putRequest, deleteRequest } from "./httpHelpers";

// 📌 Get all email triggers
export const getEmailTriggers = () => {
  return getRequest("email-triggers/get-all");
};

// 📌 Create email trigger
export const createEmailTrigger = (payload) => {
  return postRequest("email-triggers/create", payload);
};

// 📌 Update email trigger
export const updateEmailTrigger = (id, payload) => {
  return putRequest(`email-triggers/${id}/update`, payload);
};

// 📌 Delete email trigger
export const deleteEmailTrigger = (id) => {
  return deleteRequest(`email-triggers/${id}/delete`);
};
