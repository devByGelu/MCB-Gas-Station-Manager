import axios from "axios";
import store from "../store";
let ShiftFormAPI = axios.create({
  baseURL: "http://localhost:5000/api/shiftForms",
  headers: {
    "Content-Type": "application/json",
  },
});
ShiftFormAPI.interceptors.request.use(
  function (config) {
    const token = store.getState().auth.token;
    if (token) config.headers["x-auth-token"] = token;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export default ShiftFormAPI;
