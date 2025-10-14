// src/redux/api/studentApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import CookiesService from "../CookiesService/CookiesService";
 
export const studentApi = createApi({
  reducerPath: "studentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://upskilling-egypt.com:3005/api",
    prepareHeaders: (headers) => {
      const token = CookiesService.get("accessToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getGroups: builder.query<any[], void>({
      query: () => "/group",
    }),
    getStudents: builder.query<any[], void>({
      query: () => "/student",
    }),
    getQuizResults: builder.query<any[], void>({
      query: () => "/quiz/result",
    }),
    getStudentById: builder.query<any, string>({
      query: (id) => `/student/${id}`,
    }),
  }),
});

export const {
  useGetGroupsQuery,
  useGetStudentsQuery,
  useGetQuizResultsQuery,
  useGetStudentByIdQuery,
} = studentApi;