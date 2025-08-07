import { apiFetch, Project, Testimonial, Service, TeamMember, ContactMessage } from './api';

// Admin API functions
// These functions require authentication and should be used only in the admin panel

// Projects API
export async function getAdminProjects() {
  return apiFetch<Project[]>('/admin/projects', {}, true);
}

export async function createProject(data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) {
  return apiFetch<Project>('/admin/projects', {
    method: 'POST',
    body: JSON.stringify(data),
  }, true);
}

export async function updateProject(id: number, data: Partial<Omit<Project, 'id' | 'createdAt' | 'updatedAt'>>) {
  return apiFetch<Project>(`/admin/projects/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }, true);
}

export async function deleteProject(id: number) {
  return apiFetch<{ success: boolean }>(`/admin/projects/${id}`, {
    method: 'DELETE',
  }, true);
}

// Testimonials API
export async function getAdminTestimonials() {
  return apiFetch<Testimonial[]>('/admin/testimonials', {}, true);
}

export async function createTestimonial(data: Omit<Testimonial, 'id' | 'createdAt' | 'updatedAt'>) {
  return apiFetch<Testimonial>('/admin/testimonials', {
    method: 'POST',
    body: JSON.stringify(data),
  }, true);
}

export async function updateTestimonial(id: number, data: Partial<Omit<Testimonial, 'id' | 'createdAt' | 'updatedAt'>>) {
  return apiFetch<Testimonial>(`/admin/testimonials/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }, true);
}

export async function deleteTestimonial(id: number) {
  return apiFetch<{ success: boolean }>(`/admin/testimonials/${id}`, {
    method: 'DELETE',
  }, true);
}

// Services API
export async function getAdminServices() {
  return apiFetch<Service[]>('/admin/services', {}, true);
}

export async function createService(data: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>) {
  return apiFetch<Service>('/admin/services', {
    method: 'POST',
    body: JSON.stringify(data),
  }, true);
}

export async function updateService(id: number, data: Partial<Omit<Service, 'id' | 'createdAt' | 'updatedAt'>>) {
  return apiFetch<Service>(`/admin/services/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }, true);
}

export async function deleteService(id: number) {
  return apiFetch<{ success: boolean }>(`/admin/services/${id}`, {
    method: 'DELETE',
  }, true);
}

// Team API
export async function getAdminTeamMembers() {
  return apiFetch<TeamMember[]>('/admin/team', {}, true);
}

export async function createTeamMember(data: Omit<TeamMember, 'id' | 'createdAt' | 'updatedAt'>) {
  return apiFetch<TeamMember>('/admin/team', {
    method: 'POST',
    body: JSON.stringify(data),
  }, true);
}

export async function updateTeamMember(id: number, data: Partial<Omit<TeamMember, 'id' | 'createdAt' | 'updatedAt'>>) {
  return apiFetch<TeamMember>(`/admin/team/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }, true);
}

export async function deleteTeamMember(id: number) {
  return apiFetch<{ success: boolean }>(`/admin/team/${id}`, {
    method: 'DELETE',
  }, true);
}

// Messages API
export interface ContactMessageResponse extends ContactMessage {
  id: number;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export async function getContactMessages() {
  return apiFetch<ContactMessageResponse[]>('/admin/messages', {}, true);
}

export async function getContactMessageById(id: number) {
  return apiFetch<ContactMessageResponse>(`/admin/messages/${id}`, {}, true);
}

export async function markMessageAsRead(id: number) {
  return apiFetch<ContactMessageResponse>(`/admin/messages/${id}/read`, {
    method: 'PUT',
  }, true);
}

export async function deleteContactMessage(id: number) {
  return apiFetch<{ success: boolean }>(`/admin/messages/${id}`, {
    method: 'DELETE',
  }, true);
}

// Site settings API
export interface SiteSettings {
  siteName: string;
  contactEmail: string;
  aboutShort: string;
  [key: string]: any;
}

export async function getSiteSettings() {
  return apiFetch<SiteSettings>('/admin/settings', {}, true);
}

export async function updateSiteSettings(data: Partial<SiteSettings>) {
  return apiFetch<SiteSettings>('/admin/settings', {
    method: 'PUT',
    body: JSON.stringify(data),
  }, true);
}

// Password update
export interface PasswordUpdateData {
  currentPassword: string;
  newPassword: string;
}

export async function updatePassword(data: PasswordUpdateData) {
  return apiFetch<{ success: boolean; message: string }>('/admin/password', {
    method: 'PUT',
    body: JSON.stringify(data),
  }, true);
}

// File upload helper
export async function uploadFile(file: File, type: 'project' | 'testimonial' | 'team' = 'project') {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('type', type);
  
  // Özel fetch kullanıyoruz çünkü FormData ile Content-Type otomatik olarak belirlenmelidir
  const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/upload`, {
    method: 'POST',
    body: formData,
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });
  
  if (!res.ok) {
    // Hata mesajını JSON veya text olarak döndür
    let errorMsg = '';
    try {
      const data = await res.json();
      errorMsg = data.error || JSON.stringify(data);
    } catch {
      errorMsg = await res.text();
    }
    throw new Error(errorMsg || `API error: ${res.status}`);
  }
  
  // Başarılı ise JSON döndür
  return res.json() as Promise<{ url: string }>;
}

// Dashboard istatistikleri
export interface DashboardStats {
  projects: number;
  team: number;
  messages: number;
  testimonials: number;
  recentActivities: {
    id: number;
    action: string;
    description: string;
    timestamp: string;
    user: {
      id: number;
      name: string;
      email: string;
    };
  }[];
}

export async function getDashboardStats() {
  return apiFetch<DashboardStats>('/admin/stats', {}, true);
}
