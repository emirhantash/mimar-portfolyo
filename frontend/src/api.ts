const API_URL = import.meta.env.VITE_API_URL;

// JWT token'ı localStorage'dan otomatik eklemek için (isteğe bağlı)
function getAuthHeader(): Record<string, string> {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function apiFetch<T = any>(
  path: string,
  options: RequestInit = {},
  withAuth = false
): Promise<T> {
  const baseHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  // Auth header ekle
  const authHeaders = withAuth ? getAuthHeader() : {};
  
  // Options'dan gelen headers (varsa)
  const optionsHeaders = options.headers ? 
    (options.headers as Record<string, string>) : 
    {};
  
  // HeadersInit tipine uygun headers nesnesi oluştur
  const headers = new Headers({
    ...baseHeaders,
    ...optionsHeaders,
    ...authHeaders,
  });

  // Options nesnesini kopyala ve headers'ı güncelle
  const fetchOptions = {
    ...options,
    headers
  };
  
  const res = await fetch(`${API_URL}${path}`, fetchOptions);

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
  return res.json();
}

// Projects API
export interface Project {
  id: number;
  title: string;
  description: string;
  location: string;
  year: string;
  category: string;
  image: string;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

export async function getProjects(params?: { featured?: boolean; category?: string; limit?: number }) {
  const searchParams = new URLSearchParams();
  
  if (params?.featured) searchParams.append('featured', 'true');
  if (params?.category) searchParams.append('category', params.category);
  if (params?.limit) searchParams.append('limit', params.limit.toString());
  
  const queryString = searchParams.toString() ? `?${searchParams.toString()}` : '';
  
  return apiFetch<Project[]>(`/projects${queryString}`);
}

export function getProjectById(id: number) {
  return apiFetch<Project>(`/projects/${id}`);
}

// Testimonials API
export interface Testimonial {
  id: number;
  name: string;
  title: string;
  content: string;
  rating: number;
  image?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export function getTestimonials() {
  return apiFetch<Testimonial[]>('/testimonials');
}

// Services API
export interface Service {
  id: number;
  title: string;
  description: string;
  icon?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export function getServices() {
  return apiFetch<Service[]>('/services');
}

// Team API
export interface TeamMember {
  id: number;
  name: string;
  title: string;
  bio?: string;
  image?: string;
  email?: string;
  linkedin?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export function getTeamMembers() {
  return apiFetch<TeamMember[]>('/team');
}

// Contact API
export interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export function sendContactForm(data: ContactFormData) {
  return apiFetch<{ success: boolean; message: string }>('/contact', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// Auth API
export interface LoginFormData {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    email: string;
    name: string;
    role: string;
  };
}

export function login(data: LoginFormData) {
  return apiFetch<AuthResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function getCurrentUser() {
  return apiFetch<{ user: AuthResponse['user'] }>('/auth/me', {}, true);
}
