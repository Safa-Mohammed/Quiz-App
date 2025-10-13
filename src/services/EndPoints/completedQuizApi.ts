// src/redux/api/completedQuizApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const completedQuizApi = createApi({
  reducerPath: "completedQuizApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://upskilling-egypt.com:3005/api",  
    prepareHeaders: (headers) => {
       const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("accessToken="))
        ?.split("=")[1];

      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCompletedQuizzes: builder.query<any[], void>({
      query: () => "/quiz/completed",
    }),
    getGroups: builder.query<any[], void>({
      query: () => "/group",
    }),
  }),
});

export const {
  useGetCompletedQuizzesQuery,
  useGetGroupsQuery,
} = completedQuizApi;
