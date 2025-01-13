import axios from "axios";
import { getUserCookie, SetCookie } from "../utils/getUsersCookie";
import { newToken } from "../services/token";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

api.interceptors.request.use(
  (request) => {
    const accessToken = getUserCookie("accessToken");
    if (accessToken) {
      request.headers["Authorization"] = ` bearer ${accessToken}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response)=> {
    return response;
  },  async error=>{
    const errorConfig = error.config;
    if(error.response.status === 401 && !errorConfig._retry){
     errorConfig._retry = true;
     const res = await newToken();
     if(!res?.response) return ;
     SetCookie(res.response.data);
     return api(errorConfig)
    }
  }
)
