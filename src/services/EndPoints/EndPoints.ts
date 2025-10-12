import axios from "axios";
import CookiesService from "../CookiesService/CookiesService";

export const baseURL = "https://upskilling-egypt.com:3005/api";

// Axios instance that attaches token dynamically
export const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = CookiesService.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Axios instance for requests that don't need auth
export const AuthAxiosInstance = axios.create({
  baseURL,
});

export const Auth = {
  login: `/auth/login`,
  register: `/auth/register`,
  changePassword: `/auth/change-password`,
  forgotPassword: `/auth/forgot-password`,
  resetPassword: `/auth/reset-password`,
  logout: `/auth/logout`,
};


export const DASHBOARDENDPOINTS = {
  FirstFiveIncoming:`${baseURL}/quiz/incomming`,
  TopFiveStudents:`${baseURL}/student/top-five`,
 GETSTUDENTDETAILS : (id: number ) => `${baseURL}/student/${id}`
}


export const GROUPSENDPOINTS = {
  CREATEGROUP:`${baseURL}/group`,
  GETALL:`${baseURL}/group`,
  UPDATE:(id: string ) => `${baseURL}/group/${id}`,
  DELETE:(id: string ) => `${baseURL}/group/${id}`
}