// ApiService/dashboard.js
import { getRequest } from "./httpHelpers";

const BASE_URL = "/dashboard";

// GET DASHBOARD DATA
export const getDashboardData = async () => {
  try {
    const response = await getRequest(BASE_URL);
    return response;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error;
  }
};