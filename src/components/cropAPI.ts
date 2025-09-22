// services/cropApi.ts
import { CropFormData, ApiResponse, OptionsResponse } from '../types/crops';

const API_BASE_URL = 'http://localhost:5000/api';

export const cropApi = {
  async getOptions(): Promise<OptionsResponse> {
    const response = await fetch(`${API_BASE_URL}/options`);
    if (!response.ok) {
      throw new Error('Failed to fetch options');
    }
    return response.json();
  },

  async getRecommendations(formData: CropFormData): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/recommend`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to get recommendations');
    }
    
    return response.json();
  },
};