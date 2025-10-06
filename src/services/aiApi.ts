const API_BASE_URL = 'http://localhost:5000/api';

// Generic API call function
const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('AI API call failed:', error);
    throw error;
  }
};

export interface StudentProfile {
  name: string;
  age: number;
  interests: string[];
  skills: string[];
  subjects: string[];
  goals: string[];
  personality: string[];
  budget: string;
  location: string;
  workStyle: string;
  learningStyle: string;
}

export interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  data?: any;
}

export interface AIChatRequest {
  message: string;
  language: 'fr' | 'ar';
  studentProfile?: StudentProfile;
  conversationHistory?: Message[];
}

export interface AIRecommendationsRequest {
  studentProfile: StudentProfile;
  language: 'fr' | 'ar';
}

export interface AIChatResponse {
  success: boolean;
  response: string;
  timestamp: string;
}

export interface AIRecommendationsResponse {
  success: boolean;
  recommendations: string;
  timestamp: string;
}

// AI API
export const aiApi = {
  // Send a message to the AI chatbot
  chat: (data: AIChatRequest): Promise<AIChatResponse> =>
    apiCall('/ai/chat', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Get AI recommendations based on student profile
  getRecommendations: (data: AIRecommendationsRequest): Promise<AIRecommendationsResponse> =>
    apiCall('/ai/recommendations', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

export default {
  ai: aiApi,
}; 