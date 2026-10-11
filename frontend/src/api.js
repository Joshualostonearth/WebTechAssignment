const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers
    }
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || `Request failed (${response.status})`);
  }
  return data;
}

// Keep all HTTP calls in one place so components stay focused on UI/state.
export const getTasks = () => request("/tasks");
export const createTask = (title) =>
  request("/tasks", { method: "POST", body: JSON.stringify({ title }) });
export const updateTask = (id, changes) =>
  request(`/tasks/${id}`, { method: "PUT", body: JSON.stringify(changes) });
export const deleteTask = (id) => request(`/tasks/${id}`, { method: "DELETE" });
