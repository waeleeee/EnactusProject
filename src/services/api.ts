// Prefer env-configured API base; fall back to same-origin \/api
const API_BASE_URL =
  (process.env.REACT_APP_API_BASE_URL as string | undefined) || '/api';

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
    console.error('API call failed:', error);
    throw error;
  }
};

// Universities API
export const universitiesApi = {
  // Try backend first; on failure, fall back to deriving from bundled programs JSON
  getAll: async () => {
    try {
      return await apiCall('/universities');
    } catch (e) {
      // Fallback: build minimal universities list from local programs JSON
      try {
        const res = await fetch('/universities_tunisia.json');
        const programs = await res.json();
        const nameToUniversity: Record<string, any> = {};
        for (const p of programs as Array<any>) {
          const name = typeof p.university === 'string' ? p.university : p.university?.name;
          if (!name) continue;
          if (!nameToUniversity[name]) {
            nameToUniversity[name] = {
              id: name, // minimal identifier
              name,
              nameFr: name,
              region: '',
              regionFr: '',
              website: '',
              email: '',
              phone: '',
              address: '',
            };
          }
        }
        return Object.values(nameToUniversity);
      } catch (fallbackErr) {
        throw e instanceof Error ? e : new Error('Failed to load universities');
      }
    }
  },
  getById: (id: string) => apiCall(`/universities/${id}`),
};

// Programs API
export const programsApi = {
  // Try backend first; on failure, fall back to bundled JSON
  getAll: async () => {
    try {
      return await apiCall('/programs');
    } catch (e) {
      // Local fallback
      const res = await fetch('/universities_tunisia.json');
      const data = await res.json();
      // Normalize shape to align with UI expectations where possible
      return (data as Array<any>).map((item, index) => ({
        id: item.id?.toString?.() || `program-${index}`,
        university:
          typeof item.university === 'string'
            ? { name: item.university }
            : item.university || { name: '' },
        degree: item.degree || '',
        duration: item.duration ?? '',
        special_note: item.special_note ?? '',
        field: item.field || '',
        score: item.score ?? '',
        code: item.code || '',
        specialization: item.specialization ?? '',
      }));
    }
  },
  getById: (id: string) => apiCall(`/programs/${id}`),
  getByUniversity: (universityId: string) => apiCall(`/programs/university/${universityId}`),
  search: (query: string) => apiCall(`/programs/search?q=${encodeURIComponent(query)}`),
};

// Auth API
export const authApi = {
  login: (credentials: { email: string; password: string }) =>
    apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
  register: (userData: { name: string; email: string; password: string }) =>
    apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),
  getProfile: () => apiCall('/auth/profile'),
};

export default {
  universities: universitiesApi,
  programs: programsApi,
  auth: authApi,
}; 