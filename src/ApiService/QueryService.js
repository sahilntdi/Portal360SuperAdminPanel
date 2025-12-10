import { getRequest } from "./httpHelpers";

const BASE_URL = "/contacts";

export const QueryService = {
  getAllContacts: () => getRequest(BASE_URL),
};
