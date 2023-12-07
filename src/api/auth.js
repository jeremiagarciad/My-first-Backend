import axiosInstance from "./axios";

export const registerRequest = (user) => axiosInstance.post(`/register`, user);

export const loginRequest = (user) => axiosInstance.post(`/login`, user);

export const verifyTokenRequest = (user) => axiosInstance.get("/verify", user);

// export const logoutRequest = (user) => axiosInstance.postget("/verify", user);

// const axiosInstance = axios.create();

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = Cookies.get("_auth");

//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     return config;
//   },

//   function (error) {
//     return Promise.reject(error);
//   }
// );
