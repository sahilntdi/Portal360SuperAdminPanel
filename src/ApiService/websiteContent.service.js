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

  addBlog: (payload) => {
    const clean = { ...payload };

    // 🔥 HARD DELETE any id-related field
    delete clean._id;
    delete clean.id;
    delete clean.__v;

    if (clean.imageFile instanceof File) {
      const formData = new FormData();

      Object.keys(clean).forEach((key) => {
        if (key !== "imageFile") {
          formData.append(key, clean[key]);
        }
      });

      formData.append("image", clean.imageFile);

      return instance.post("blogs", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }

    return instance.post("blogs", clean);
  },

  updateBlog: (id, payload) => {
    const clean = { ...payload };

    delete clean._id;
    delete clean.id;
    delete clean.__v;

    // If a new file was selected
    if (clean.imageFile instanceof File) {
      const formData = new FormData();

      Object.keys(clean).forEach(key => {
        if (key !== "imageFile") formData.append(key, clean[key]);
      });

      formData.append("image", clean.imageFile);

      return instance.put(`blogs/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
    }

    // If no file → send normal JSON
    return instance.put(`blogs/${id}`, clean);
  },


  deleteBlog: (id) => instance.delete(`blogs/${id}`),


  /* -------------------- MODERN TEAMS -------------------- */
  getModernTeams: () => instance.get("modern-teams"),
  addModernTeam: (payload) => {
    if (payload.imageFile instanceof File) {
      const fd = new FormData();

      fd.append("title", payload.title);
      fd.append("description", payload.description);
      fd.append("icon", payload.icon);
      fd.append("image", payload.imageFile);

      return instance.post("modern-teams", fd, {
        headers: { "Content-Type": "multipart/form-data" }
      });
    }

    return instance.post("modern-teams", payload);
  }
  ,
  updateModernTeam: (id, payload) => {
    if (payload.imageFile instanceof File) {
      const fd = new FormData();

      fd.append("title", payload.title);
      fd.append("description", payload.description);
      fd.append("icon", payload.icon);
      fd.append("image", payload.imageFile);

      return instance.put(`modern-teams/${id}`, fd, {
        headers: { "Content-Type": "multipart/form-data" }
      });
    }

    return instance.put(`modern-teams/${id}`, payload);
  },

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
    if (payload instanceof FormData) {
      return instance.post("integrations", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }

    return instance.post("integrations", payload);
  },

  updateIntegration: (id, payload) => {
    if (payload instanceof FormData) {
      return instance.put(`integrations/${id}`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }

    return instance.put(`integrations/${id}`, payload);
  },





  deleteIntegration: (id) => instance.delete(`integrations/${id}`),

};
