import { getRequest, postRequest, putRequest, deleteRequest } from "./httpHelpers";

// 📌 Get all features
export const getAllFeatures = () => {
  return getRequest("features");
};

// 📌 Create new feature
export const createFeature = (payload) => {
  return postRequest("features", payload);
};

// 📌 Update feature by ID
export const updateFeature = (id, payload) => {
  return putRequest(`features/${id}`, payload);
};

// 📌 Delete feature by ID
export const deleteFeature = (id) => {
  return deleteRequest(`features/${id}`);
};
