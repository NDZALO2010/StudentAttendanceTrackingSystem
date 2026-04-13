const API_BASE = process.env.REACT_APP_API_BASE || '';

function buildUrl(path) {
  // If path already includes protocol, leave it alone.
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  return `${API_BASE}${path}`;
}

async function fetchJson(path, options = {}) {
  const url = buildUrl(path);

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const finalOptions = {
    credentials: 'include',
    headers,
    ...options,
  };

  const response = await fetch(url, finalOptions);
  const text = await response.text();
  const data = text ? JSON.parse(text) : {};

  if (!response.ok) {
    const errorMessage = data?.message || response.statusText || 'Unknown error';
    const error = new Error(errorMessage);
    error.status = response.status;
    error.details = data;
    throw error;
  }

  return data;
}

export async function login({ username, password }) {
  return fetchJson('/api/auth/login/', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
}

export async function logout() {
  return fetchJson('/api/auth/logout/', {
    method: 'POST',
  });
}

export async function getCurrentUser() {
  return fetchJson('/api/auth/me/');
}

export async function getStudentDashboard() {
  return fetchJson('/api/student/dashboard/');
}

export async function getLecturerDashboard() {
  return fetchJson('/api/lecturer/dashboard/');
}
