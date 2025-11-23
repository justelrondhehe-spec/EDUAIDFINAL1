// frontend/src/api/client.ts
import axios, { AxiosRequestConfig, AxiosError } from "axios";

const baseURL = (import.meta.env.VITE_API_URL as string) || "http://localhost:5000/api";

const client = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  // withCredentials: true, // enable only if you switch to cookie-based auth
});

// Attach token (Bearer) from localStorage to every request
client.interceptors.request.use((config: AxiosRequestConfig) => {
  try {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      // @ts-ignore - axios header typing differences across versions
      if (!config.headers["Authorization"]) {
        // @ts-ignore
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
  } catch (e) {
    // ignore localStorage errors
  }
  return config;
}, (error) => Promise.reject(error));

// Global response handler: on 401 remove token and broadcast logout
client.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error?.response?.status;
    if (status === 401) {
      try {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      } catch (e) {}
      // Broadcast so app can react (redirect to login, clear state, etc)
      window.dispatchEvent(new CustomEvent("auth:logout", { detail: { reason: "unauthorized" } }));
    }
    return Promise.reject(error);
  }
);

export default client;
