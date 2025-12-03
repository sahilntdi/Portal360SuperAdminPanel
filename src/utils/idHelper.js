// src/utils/idHelper.js
export function getItemId(item) {
  if (!item) return null;
  
  // Try to get the ID in order of preference
  return item._id || item.id;
}

export function prepareDataForAPI(data) {
  // Remove any undefined or null values
  const cleanedData = {};
  
  Object.keys(data).forEach(key => {
    if (data[key] !== undefined && data[key] !== null) {
      cleanedData[key] = data[key];
    }
  });
  
  return cleanedData;
}