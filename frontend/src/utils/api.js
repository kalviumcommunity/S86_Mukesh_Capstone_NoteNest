import axios from "axios";

const API_BASE = import.meta.env.VITE_DEPLOY_URL || "http://localhost:5000";

export const api = axios.create({
  baseURL: API_BASE + "/api",
  withCredentials: true,
});
