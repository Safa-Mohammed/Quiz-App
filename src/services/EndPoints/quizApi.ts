import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import CookiesService from "../../services/CookiesService/CookiesService";

export const quizApi = createApi({
  reducerPath: "quizApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://upskilling-egypt.com:3005/api",
    prepareHeaders: (headers) => {
      const token = CookiesService.get("accessToken");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUpcomingQuizzes: builder.query({
      query: () => "/quiz/incomming",
    }),
    getGroups: builder.query({
      query: () => "/group",
    }),
  }),
});

export const {
  useGetUpcomingQuizzesQuery,
  useGetGroupsQuery,
} = quizApi;