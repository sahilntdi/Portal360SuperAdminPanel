import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
} from "./httpHelpers";

// GET all security features
export const getSecurityFeatures = () => {
  return getRequest("security");
};

// GET by id
export const getSecurityFeatureById = (id) => {
  return getRequest(`security/${id}`);
};

// CREATE
export const createSecurityFeature = (payload) => {
  return postRequest("security", payload);
};

// UPDATE
export const updateSecurityFeature = (id, payload) => {
  return putRequest(`security/${id}`, payload);
};

// DELETE
export const deleteSecurityFeature = (id) => {
  return deleteRequest(`security/${id}`);
};
