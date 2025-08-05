const API_URL = import.meta.env.VITE_API_URL;

// JWT token'ı localStorage'dan otomatik eklemek için (isteğe bağlı)
function getAuthHeader() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function apiFetch<T = any>(
  path: string,
  options: RequestInit = {},
  withAuth = false
): Promise<T> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
    ...(withAuth ? getAuthHeader() : {}),
  };

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
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
  return res.json();
}
