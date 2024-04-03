import axios from "axios";

export const API_BASE_URL = "http://localhost:5000";

export const api = axios.create({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  },
});
