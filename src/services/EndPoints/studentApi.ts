import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import CookiesService from "../../services/CookiesService/CookiesService";

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
    getGroups: builder.query({
      query: () => `/group`,
    }),
    getStudents: builder.query({
      query: () => `/student`,
    }),
    getStudentById: builder.query({
      query: (id) => `/student/${id}`,
    }),
    getQuizResults: builder.query({
      query: () => `/quiz/result`,
    }),
    deleteStudent: builder.mutation({
      query: (id: string) => ({
        url: `/student/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetGroupsQuery,
  useGetStudentsQuery,
  useGetStudentByIdQuery,
  useGetQuizResultsQuery,
  useDeleteStudentMutation,
} = studentApi;
