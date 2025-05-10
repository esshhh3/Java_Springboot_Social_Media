import axios from "axios";

export const API_BASE_URL = "http://localhost:8081/api"; // Update if needed

export const api = axios.create({
  baseURL: API_BASE_URL,
});

// This function sets the Authorization header for all requests
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      localStorage.removeItem("token");
      window.location.href = "/"; // Redirect to login
    }
    return Promise.reject(error);
  }
);