import axios from "axios";

// ============================================================
// API
// ============================================================

const api = axios.create({
  baseURL: "/api",

  // IMPORTANT:
  // Browser cookies automatically send karega
  withCredentials: true,

  headers: {
    "Content-Type": "application/json",
  },
});

// ============================================================
// REQUEST DEBUG
// ============================================================

api.interceptors.request.use(
  (config) => {
    console.log(
      "API REQUEST:",
      config.method?.toUpperCase(),
      config.baseURL + config.url
    );

    console.log(
      "WITH CREDENTIALS:",
      config.withCredentials
    );

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ============================================================
// RESPONSE DEBUG
// ============================================================

api.interceptors.response.use(
  (response) => {
    console.log(
      "API RESPONSE:",
      response.status,
      response.config?.url
    );

    return response;
  },
  (error) => {
    console.error(
      "API RESPONSE ERROR:",
      error.response?.status,
      error.response?.data || error.message
    );

    return Promise.reject(error);
  }
);

export default api;