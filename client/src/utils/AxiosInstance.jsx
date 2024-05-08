import axios from "axios";

const baseURL = "https://ns-bookstore.onrender.com";

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

const token = localStorage.getItem("token");

if (token) {
  axiosInstance.defaults.headers.common["x-access-token"] = token;
}

export const updateToken = (token) => {
  console.log(token);
  localStorage.setItem("token", token);
  axiosInstance.defaults.headers.common["x-access-token"] = token;
};

export default axiosInstance;
