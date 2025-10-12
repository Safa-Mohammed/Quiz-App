import axios from "axios";
import CookiesService from "../CookiesService/CookiesService";

export const baseURL = "https://upskilling-egypt.com:3005/api";

// Axios instance that attaches token dynamically
export const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = CookiesService.get("accessToken");
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

/************* Questions EndPoints ******************/
export const QUESTIONS_URLS = {
  GET_ALL_QUESTIONS: "/question",
  ADD_QUESTION: "/question",
  UPDATE_QUESTION: (id: string) => `/question/${id}`,
  DELETE_QUESTION: (id: string) => `/question/${id}`,
  GET_QUESTION_BY_ID: (id: string) => `/question/${id}`,
};


/************* Quizzes EndPoints ******************/
export const QUIZZES_URL = {
  GET_FIRSTFIVEINCOMING: `/quiz/incomming`,
  GET_LASTFIVECOMPLETED: `/quiz/completed`,
  CREATE_NEW_QUIZE: `/quiz`,
  CET_ALL_QUIZZES: `/quiz`,
  GET_QUIZ_DETAILS: (id: string) => `/quiz/${id}`,
};
