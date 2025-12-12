import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
} from "./httpHelpers";

const BASE = "pricing";

export const getPricing = () => getRequest(BASE);

export const createPricing = (payload) => postRequest(BASE, payload);

export const updatePricing = (id, payload) => putRequest(`${BASE}/${id}`, payload);

export const deletePricing = (id) => deleteRequest(`${BASE}/${id}`);
