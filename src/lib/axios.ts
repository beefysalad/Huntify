import axios from "axios";

/**
 * Shared Axios instance used across the app so we can call
 * `api.get(...)` / `api.post(...)` instead of fetch.
 *
 * If we later add auth headers again (e.g., NextAuth JWT or Firebase),
 * we can update the request interceptor below.
 */
const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    // Placeholder for future Authorization header injection.
    // e.g., config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Centralized error handling spot if we need to log/redirect.
    return Promise.reject(error);
  }
);

export default api;
