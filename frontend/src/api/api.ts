// frontend/src/api/api.ts
import client from './client';

// AUTH
export const auth = {
  login: (email: string, password: string) =>
    client.post('/auth/login', { email, password }),

  register: (payload: { name?: string; email: string; password: string }) =>
    client.post('/auth/register', payload),

  me: () => client.get('/auth/me'),

  // ✔ FIXED: must match backend route
  verify2faLogin: (code: string, tempToken: string) =>
    client.post('/auth/2fa/login', {
      token: code,
      tempToken,
    }),
};


// LESSONS
export const lessonsApi = {
  list: (params?: Record<string, any>) => client.get('/lessons', { params }),
  get: (id: string) => client.get(`/lessons/${id}`),
  create: (payload: any) => client.post('/lessons', payload), // protected
  update: (id: string, payload: any) => client.put(`/lessons/${id}`, payload),
  delete: (id: string) => client.delete(`/lessons/${id}`),
};

// ACTIVITIES
export const activitiesApi = {
  list: (params?: Record<string, any>) => client.get('/activities', { params }),
  get: (id: string) => client.get(`/activities/${id}`),
  create: (payload: any) => client.post('/activities', payload),
  update: (id: string, payload: any) => client.put(`/activities/${id}`, payload),
  delete: (id: string) => client.delete(`/activities/${id}`),
};

// SETTINGS
export const settingsApi = {
  get: () => client.get('/settings'),
  update: (payload: any) => client.put('/settings', payload),
};

// ADMIN (protected)
export const adminApi = {
  dashboard: () => client.get('/admin/dashboard'), // optional aggregated endpoint
  users: () => client.get('/admin/users'),
  getUser: (id: string) => client.get(`/admin/users/${id}`),
  updateUserRole: (id: string, role: string) =>
    client.put(`/admin/users/${id}/role`, { role }),
  deleteUser: (id: string) => client.delete(`/admin/users/${id}`),
};

export const progressApi = {
  updateLesson: (userId: string, lessonId: string, completed: boolean) =>
    client.patch(`/progress/lesson/${userId}`, { lessonId, completed }),

  updateActivity: (userId: string, activityId: string, completed: boolean) =>
    client.patch(`/progress/activity/${userId}`, { activityId, completed }),
};
