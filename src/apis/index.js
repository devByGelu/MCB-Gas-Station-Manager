import axios from "axios"
import store from "../store"
import { switchErrorSnackBar, returnErrors } from "../actions"
function getDomain() {
  return "localhost:5000"
}
function applyErrorHandler(API) {
  API.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      if (error.response && error.response.data) {
        const { status } = error.response
        if (status === 500) {
          store.dispatch(
            returnErrors(error.response.data.message, error.response.status)
          )
          store.dispatch(switchErrorSnackBar(true))
        }
        return Promise.reject(error.response.data)
      }
      return Promise.reject(error.message)
    }
  )
  return API
}
function applyAuth(API) {
  API.interceptors.request.use(
    function (config) {
      const token = store.getState().auth.token
      if (token) config.headers["x-auth-token"] = token
      return config
    },
    function (error) {
      return Promise.reject(error)
    }
  )
  return API
}

let domain = getDomain()
export const useAuthAPI = () => {
  let API = axios.create({
    baseURL: `http://${domain}/api/auth`,
  })
  API = applyAuth(API)
  API = applyErrorHandler(API)
  return API
}
export const useShiftFormAPI = () => {
  let API = axios.create({
    baseURL: `http://${domain}/api/shiftForms`,
    headers: {
      "Content-Type": "application/json",
    },
  })
  API = applyAuth(API)
  API = applyErrorHandler(API)
  return API
}
export const useUserAPI = () => {
  let API = axios.create({
    baseURL: `http://${domain}/api/users`,
    headers: {
      "Content-Type": "application/json",
    },
  })
  API = applyAuth(API)
  API = applyErrorHandler(API)
  return API
}
