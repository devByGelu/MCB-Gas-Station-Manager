import axios from "axios";
import store from "../store";
let AuthAPI = axios.create({
  baseURL: "http://localhost:5000/api/auth",
  headers: {
    "Content-Type": "application/json",
  },
});
AuthAPI.interceptors.request.use(
  function (config) {
    const token = store.getState().auth.token;
    alert(token);
    if (token) config.headers["x-auth-token"] = token;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export default AuthAPI;
