import instance from "@/utils/axios";

export const WebsiteContentService = {

  /* -------------------- HOW IT WORKS -------------------- */
  getHowItWorks: () => instance.get("how-it-works"),
  addStep: (payload) => instance.post("how-it-works", payload),
  updateStep: (id, payload) => instance.put(`how-it-works/${id}`, payload),
  deleteStep: (id) => instance.delete(`how-it-works/${id}`),

  /* -------------------- FAQ -------------------- */
  getFAQ: () => instance.get("faqs"),
  addFAQ: (payload) => instance.post("faqs", payload),
  updateFAQ: (id, payload) => instance.put(`faqs/${id}`, payload),
  deleteFAQ: (id) => instance.delete(`faqs/${id}`),

  /* -------------------- TESTIMONIALS -------------------- */
  getTestimonials: () => instance.get("testimonials"),
  addTestimonial: (payload) => instance.post("testimonials", payload),
  updateTestimonial: (id, payload) =>
    instance.put(`testimonials/${id}`, payload),
  deleteTestimonial: (id) => instance.delete(`testimonials/${id}`),

  /* -------------------- BLOGS -------------------- */
  getBlogs: () => instance.get("blogs"),
  addBlog: (payload) => instance.post("blogs", payload),
  updateBlog: (id, payload) => instance.put(`blogs/${id}`, payload),
  deleteBlog: (id) => instance.delete(`blogs/${id}`),

  /* -------------------- MODERN TEAMS -------------------- */
  getModernTeams: () => instance.get("modern-teams"),
  addModernTeam: (payload) => instance.post("modern-teams", payload),
  updateModernTeam: (id, payload) =>
    instance.put(`modern-teams/${id}`, payload),
  deleteModernTeam: (id) => instance.delete(`modern-teams/${id}`),

  /* -------------------- SUPERADMIN CONTROLS -------------------- */
  getSuperadminControls: () => instance.get("superadmin-controls"),
  addSuperadminControl: (payload) =>
    instance.post("superadmin-controls", payload),
  updateSuperadminControl: (id, payload) =>
    instance.put(`superadmin-controls/${id}`, payload),
  deleteSuperadminControl: (id) =>
    instance.delete(`superadmin-controls/${id}`),



  /* -------------------- INTEGRATIONS -------------------- */
  getIntegrations: () => instance.get("integrations"),

  addIntegration: (payload) => {
    const formData = new FormData();

    formData.append("name", payload.name);
    formData.append("order", payload.order);

    // File optional
    if (payload.image) formData.append("image", payload.image);

    return instance.post("integrations", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  updateIntegration: (id, payload) => {
    const formData = new FormData();

    formData.append("name", payload.name);
    formData.append("order", payload.order);

    if (payload.image) formData.append("image", payload.image);

    return instance.post(`integrations/${id}?_method=PUT`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  deleteIntegration: (id) => instance.delete(`integrations/${id}`),

};
