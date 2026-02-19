// Add these to your WebsiteContentService object in ApiService.js

// 📌 Get all heroes
export const getHero = () => {
  return getRequest("hero");
};

// 📌 Get hero by ID
export const getHeroById = (id) => {
  return getRequest(`hero/${id}`);
};

// 📌 Create new hero
export const addHero = (payload) => {
  // Check if payload is FormData
  if (payload instanceof FormData) {
    return postRequest("hero", payload, {
      headers: { "Content-Type": "multipart/form-data" }
    });
  }
  return postRequest("hero", payload);
};

// 📌 Update hero by ID
export const updateHero = (id, payload) => {
  // Check if payload is FormData
  if (payload instanceof FormData) {
    return putRequest(`hero/${id}`, payload, {
      headers: { "Content-Type": "multipart/form-data" }
    });
  }
  return putRequest(`hero/${id}`, payload);
};

// 📌 Delete hero by ID
export const deleteHero = (id) => {
  return deleteRequest(`hero/${id}`);
};

// 📌 Add dynamic word to hero
export const addDynamicWord = (heroId, payload) => {
  return postRequest(`hero/${heroId}/word`, payload);
};

// 📌 Remove dynamic word from hero
export const removeDynamicWord = (heroId, payload) => {
  return deleteRequest(`hero/${heroId}/word`, { data: payload });
};