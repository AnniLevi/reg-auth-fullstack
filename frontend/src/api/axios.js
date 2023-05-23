import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;
const REFRESH_URL = "/api/auth/token/refresh/";

export default axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: localStorage.getItem("accessToken")
      ? "Bearer " + localStorage.getItem("accessToken")
      : null,
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    console.log("error.response", error.response);
    console.log("error.config", error.config);

    if (typeof error.response === "undefined") {
      console.log("A server/network error occurred. ");
      return Promise.reject(error);
    }

    if (
      error.response.status === 401 &&
      originalRequest.url === BASE_URL + REFRESH_URL
    ) {
      window.location.href = "/";
      return Promise.reject(error);
    }

    if (
      error.response.data.code === "token_not_valid" &&
      error.response.status === 401 &&
      error.response.statusText === "Unauthorized"
    ) {
      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken) {
        const tokenParts = JSON.parse(atob(refreshToken.split(".")[1]));

        // exp date in token is expressed in seconds, while now() returns milliseconds:
        const now = Math.ceil(Date.now() / 1000);
        console.log(tokenParts.exp);

        if (tokenParts.exp > now) {
          return axiosInstance
            .post(REFRESH_URL, { refresh: refreshToken })
            .then((response) => {
              localStorage.setItem("accessToken", response.data.access);
              localStorage.setItem("refreshToken", response.data.refresh);

              axiosInstance.defaults.headers["Authorization"] =
                "Bearer " + response.data.access;
              originalRequest.headers["Authorization"] =
                "Bearer " + response.data.access;

              return axiosInstance(originalRequest);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("Refresh token is expired", tokenParts.exp, now);
          window.location.href = "/login/";
        }
      } else {
        console.log("Refresh token not available.");
        window.location.href = "/login/";
      }
    }

    return Promise.reject(error);
  }
);
