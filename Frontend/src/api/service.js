import axios from "axios";

const API = "http://localhost:5000/api";

/* ================= AUTH HEADER ================= */
const authHeader = () => {
  const token = localStorage.getItem("token");

  return token
    ? { headers: { Authorization: `Bearer ${token}` } }
    : {};
};

/* ================= AUTH ================= */

/* Register user */
export const registerUser = (data) => {
  return axios.post(`${API}/auth/register`, data);
};

/* Login user */
export const loginUser = (data) => {
  return axios.post(`${API}/auth/login`, data);
};

/* Get logged-in user */
export const getMe = () => {
  return axios.get(`${API}/auth/me`, authHeader());
};

/* ================= JOBS ================= */

/* Get all jobs (public) */
export const getJobs = () => {
  return axios.get(`${API}/jobs`);
};

/* Create job (protected) */
export const createJob = (data) => {
  return axios.post(`${API}/jobs`, data, authHeader());
};

/* Update job status (protected) */
export const updateJob = (id, status) => {
  return axios.patch(
    `${API}/jobs/${id}`,
    { status },
    authHeader()
  );
};

/* Delete job (protected) */
export const deleteJob = (id) => {
  return axios.delete(`${API}/jobs/${id}`, authHeader());
};