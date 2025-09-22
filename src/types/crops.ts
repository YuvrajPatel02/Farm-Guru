// types/crop.ts
export interface CropFormData {
  District: string;
  Season: string;
  Rainfall: string;
  Temperature: string;
  LandType: string;
  Irrigation: string;
  SoilType: string;
}

export interface CropRecommendation {
  crop: string;
  confidence: number;
}

export interface ApiResponse {
  success: boolean;
  recommendations: CropRecommendation[];
  input?: CropFormData;
  error?: string;
}

export interface OptionsResponse {
  District?: string[];
  Season?: string[];
  Rainfall?: string[];
  Temperature?: string[];
  LandType?: string[];
  Irrigation?: string[];
  SoilType?: string[];
  Recommended_Crop?: string[];
  error?: string;
}