// If your API returns single object, create this type
export interface SecurityFeatureResponse {
  message: string;
  data: SecurityFeature | SecurityFeature[]; // Can be single or array
}

export interface SecurityFeature {
  _id: string;
  name: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v?: number; // Optional mongoose version key
}