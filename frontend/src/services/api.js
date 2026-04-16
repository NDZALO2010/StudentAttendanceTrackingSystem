function normalizeApiBase(rawBase) {
  if (!rawBase) {
    return '';
  }

  let normalized = rawBase.trim();
  if (!normalized) {
    return '';
  }

  if (!/^https?:\/\//i.test(normalized)) {
    normalized = `https://${normalized}`;
  }

  return normalized.replace(/\/+$/, '');
}

const API_BASE = normalizeApiBase(process.env.REACT_APP_API_BASE || '');

function buildUrl(path) {
  // If path already includes protocol, leave it alone.
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  return `${API_BASE}${path}`;
}

async function fetchJson(path, options = {}) {
  const url = buildUrl(path);

  const method = (options.method || 'GET').toUpperCase();
  const headers = {
    ...options.headers,
  };

  // Only set JSON content type when sending a request body.
  if ((method === 'POST' || method === 'PUT' || method === 'PATCH' || method === 'DELETE') && options.body && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  const finalOptions = {
    credentials: 'include',
    headers,
    ...options,
  };

  const response = await fetch(url, finalOptions);
  const text = await response.text();
  const contentType = response.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');
  const data = text && isJson ? JSON.parse(text) : {};

  if (!isJson && text) {
    const error = new Error('Server returned non-JSON response. Check REACT_APP_API_BASE and backend CORS settings.');
    error.status = response.status;
    error.details = text.slice(0, 200);
    throw error;
  }

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
