import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  register: (data: { name: string; email: string; password: string }) =>
    api.post('/auth/register', data),
  requestPasswordReset: (email: string) =>
    api.post('/auth/password-reset/request', { email }),
  resetPassword: (token: string, newPassword: string) =>
    api.post('/auth/password-reset', { token, newPassword }),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data: { name?: string; officeId?: string }) => api.patch('/auth/profile', data),
  changePassword: (currentPassword: string, newPassword: string) =>
    api.post('/auth/change-password', { currentPassword, newPassword }),
};

export const usersApi = {
  getAll: (params?: Record<string, unknown>) => api.get('/users', { params }),
  getById: (id: string) => api.get(`/users/${id}`),
  search: (params?: Record<string, unknown>) => api.get('/users/search', { params }),
  create: (data: Record<string, unknown>) => api.post('/users', data),
  update: (id: string, data: Record<string, unknown>) => api.patch(`/users/${id}`, data),
  assignRoles: (id: string, roleIds: string[]) => api.patch(`/users/${id}/roles`, { roleIds }),
  deactivate: (id: string) => api.patch(`/users/${id}/deactivate`),
  activate: (id: string) => api.patch(`/users/${id}/activate`),
  getRoles: () => api.get('/users/roles'),
};

export const officesApi = {
  getAll: (params?: Record<string, unknown>) => api.get('/offices', { params }),
  getById: (id: string) => api.get(`/offices/${id}`),
  create: (data: Record<string, unknown>) => api.post('/offices', data),
  update: (id: string, data: Record<string, unknown>) => api.patch(`/offices/${id}`, data),
  delete: (id: string) => api.delete(`/offices/${id}`),
};

export const ideasApi = {
  getAll: (params?: Record<string, unknown>) => api.get('/ideas', { params }),
  getById: (id: string) => api.get(`/ideas/${id}`),
  getCategories: () => api.get('/ideas/categories'),
  getMyIdeas: (params?: Record<string, unknown>) => api.get('/ideas/my-ideas', { params }),
  getForReview: (params?: Record<string, unknown>) => api.get('/ideas/for-review', { params }),
  create: (data: Record<string, unknown>) => api.post('/ideas', data),
  update: (id: string, data: Record<string, unknown>) => api.patch(`/ideas/${id}`, data),
  addComment: (id: string, content: string) => api.post(`/ideas/${id}/comments`, { content }),
  deleteComment: (ideaId: string, commentId: string) =>
    api.delete(`/ideas/${ideaId}/comments/${commentId}`),
  vote: (id: string) => api.post(`/ideas/${id}/vote`),
  unvote: (id: string) => api.delete(`/ideas/${id}/vote`),
};

export const reviewsApi = {
  getAll: (params?: Record<string, unknown>) => api.get('/reviews', { params }),
  getById: (id: string) => api.get(`/reviews/${id}`),
  getMyReviews: (params?: Record<string, unknown>) => api.get('/reviews/my-reviews', { params }),
  getByIdea: (ideaId: string) => api.get(`/reviews/idea/${ideaId}`),
  create: (data: { ideaId: string; decision: string; comments?: string }) =>
    api.post('/reviews', data),
};

export const projectsApi = {
  getAll: (params?: Record<string, unknown>) => api.get('/projects', { params }),
  getById: (id: string) => api.get(`/projects/${id}`),
  getMyProjects: (params?: Record<string, unknown>) => api.get('/projects/my-projects', { params }),
  getProgress: (id: string) => api.get(`/projects/${id}/progress`),
  create: (data: Record<string, unknown>) => api.post('/projects', data),
  update: (id: string, data: Record<string, unknown>) => api.patch(`/projects/${id}`, data),
  addMilestone: (projectId: string, data: Record<string, unknown>) =>
    api.post(`/projects/${projectId}/milestones`, data),
  updateMilestone: (projectId: string, milestoneId: string, data: Record<string, unknown>) =>
    api.patch(`/projects/${projectId}/milestones/${milestoneId}`, data),
  deleteMilestone: (projectId: string, milestoneId: string) =>
    api.delete(`/projects/${projectId}/milestones/${milestoneId}`),
  addProgressUpdate: (projectId: string, data: Record<string, unknown>) =>
    api.post(`/projects/${projectId}/progress-updates`, data),
  addTeamMember: (projectId: string, userId: string) =>
    api.post(`/projects/${projectId}/team`, { userId }),
  removeTeamMember: (projectId: string, userId: string) =>
    api.delete(`/projects/${projectId}/team/${userId}`),
};

export const rewardsApi = {
  getAll: (params?: Record<string, unknown>) => api.get('/rewards', { params }),
  getMyRewards: (params?: Record<string, unknown>) => api.get('/rewards/my-rewards', { params }),
  getMyStats: () => api.get('/rewards/my-stats'),
  getUserStats: (userId: string) => api.get(`/rewards/stats/${userId}`),
  getLeaderboard: (limit?: number) => api.get('/rewards/leaderboard', { params: { limit } }),
  create: (data: Record<string, unknown>) => api.post('/rewards', data),
  createNomination: (data: Record<string, unknown>) => api.post('/rewards/nominations', data),
  getNominations: (params?: Record<string, unknown>) => api.get('/rewards/nominations', { params }),
  getPendingNominations: (params?: Record<string, unknown>) =>
    api.get('/rewards/nominations/pending', { params }),
  reviewNomination: (id: string, data: { approved: boolean }) =>
    api.patch(`/rewards/nominations/${id}/review`, data),
  updateNomination: (id: string, status: string) =>
    api.patch(`/rewards/nominations/${id}`, { status }),
};

export const auditApi = {
  getAll: (params?: Record<string, unknown>) => api.get('/audit', { params }),
};
