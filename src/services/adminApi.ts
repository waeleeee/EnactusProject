const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to get auth token
const getAuthToken = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return user.token;
};

// Helper function to make authenticated requests
const makeAuthRequest = async (url: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Request failed');
  }

  return response.json();
};

// User management API
export const adminApi = {
  // Get all users
  getUsers: async () => {
    return makeAuthRequest('/auth/admin/users');
  },

  // Get single user
  getUser: async (id: string) => {
    return makeAuthRequest(`/auth/admin/users/${id}`);
  },

  // Create user
  createUser: async (userData: {
    name: string;
    email: string;
    password: string;
    bacStream: string;
    city?: string;
    role?: 'user' | 'admin';
  }) => {
    return makeAuthRequest('/auth/admin/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // Update user
  updateUser: async (id: string, userData: {
    name?: string;
    email?: string;
    bacStream?: string;
    city?: string;
    role?: 'user' | 'admin';
  }) => {
    return makeAuthRequest(`/auth/admin/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },

  // Delete user
  deleteUser: async (id: string) => {
    return makeAuthRequest(`/auth/admin/users/${id}`, {
      method: 'DELETE',
    });
  },

  // University management API
  getUniversities: async () => {
    return makeAuthRequest('/universities');
  },

  getUniversity: async (id: string) => {
    return makeAuthRequest(`/universities/${id}`);
  },

  createUniversity: async (universityData: {
    name: string;
    nameFr: string;
    website?: string;
    email?: string;
    phone?: string;
    address?: string;
    region: 'الشمال' | 'الوسط' | 'الجنوب';
    regionFr: 'Nord' | 'Centre' | 'Sud';
  }) => {
    return makeAuthRequest('/universities', {
      method: 'POST',
      body: JSON.stringify(universityData),
    });
  },

  updateUniversity: async (id: string, universityData: {
    name?: string;
    nameFr?: string;
    website?: string;
    email?: string;
    phone?: string;
    address?: string;
    region?: 'الشمال' | 'الوسط' | 'الجنوب';
    regionFr?: 'Nord' | 'Centre' | 'Sud';
  }) => {
    return makeAuthRequest(`/universities/${id}`, {
      method: 'PUT',
      body: JSON.stringify(universityData),
    });
  },

  deleteUniversity: async (id: string) => {
    return makeAuthRequest(`/universities/${id}`, {
      method: 'DELETE',
    });
  },

  // Program management API
  getPrograms: async () => {
    return makeAuthRequest('/programs');
  },

  getProgram: async (id: string) => {
    return makeAuthRequest(`/programs/${id}`);
  },

  createProgram: async (programData: {
    university: string;
    degree: string;
    duration?: string;
    special_note?: string;
    field: string;
    score?: string;
    code?: string;
    specialization?: string;
  }) => {
    return makeAuthRequest('/programs', {
      method: 'POST',
      body: JSON.stringify(programData),
    });
  },

  updateProgram: async (id: string, programData: {
    university?: string;
    degree?: string;
    duration?: string;
    special_note?: string;
    field?: string;
    score?: string;
    code?: string;
    specialization?: string;
  }) => {
    return makeAuthRequest(`/programs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(programData),
    });
  },

  deleteProgram: async (id: string) => {
    return makeAuthRequest(`/programs/${id}`, {
      method: 'DELETE',
    });
  },
}; 