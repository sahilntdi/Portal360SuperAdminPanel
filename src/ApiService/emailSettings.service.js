import { getRequest, putRequest } from "./httpHelpers";

const BASE_URL = "/email-settings";

export const EmailSettingsService = {
getEmailSettings: async () => {
  try {
    const response = await getRequest(BASE_URL);

    return {
      success: true,
      email: response?.email ?? response?.data?.email ?? "",
      data: response
    };
  } catch (error) {
    console.error("Error fetching email settings:", error);
    return {
      success: false,
      error: error.message || "Failed to fetch email settings"
    };
  }
},

  
 updateEmailSettings: async (payload) => {
  try {
    if (payload.email && !isValidEmail(payload.email)) {
      throw new Error("Invalid email format");
    }

    const response = await putRequest(BASE_URL, payload);

    return {
      success: true,
      email: response?.email ?? response?.data?.email ?? "",
      data: response
    };
  } catch (error) {
    console.error("Error updating email settings:", error);
    return {
      success: false,
      error: error.message || "Failed to update email settings"
    };
  }
}

};

// Helper function for email validation
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};