import { postRequest } from "./httpHelpers";

export const loginUser = async (credentials) => {
  const payload = {
    email: credentials.email,
    password: credentials.password,
    deviceId: credentials.deviceId,
  };

  const res = await postRequest("auth/login", payload);
  return res.data; 
};
