// src/redux/api/quizDetailApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import CookiesService from "../../services/CookiesService/CookiesService"; 

export const quizDetailApi = createApi({
  reducerPath: "quizDetailApi",
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
  tagTypes: ["Quiz", "Question"],
  endpoints: (builder) => ({
    // ✅ Fetch single question
    getQuestionById: builder.query({
      query: (id: string) => `/question/${id}`,
      providesTags: ["Question"],
    }),

    // ✅ Update quiz title
    updateQuizTitle: builder.mutation({
      query: ({ id, title }: { id: string; title: string }) => ({
        url: `/quiz/${id}`,
        method: "PUT",
        body: { title },
      }),
      invalidatesTags: ["Quiz"],
    }),
  }),
});

export const {
  useGetQuestionByIdQuery,
  useUpdateQuizTitleMutation,
} = quizDetailApi;
