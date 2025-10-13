import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { studentApi } from "../services/EndPoints/studentApi"; 
import { quizApi } from "../services/EndPoints/quizApi";
import { completedQuizApi } from "../services/EndPoints/completedQuizApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,

    [studentApi.reducerPath]: studentApi.reducer,
    [quizApi.reducerPath]: quizApi.reducer,
    [completedQuizApi.reducerPath]: completedQuizApi.reducer,  
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(studentApi.middleware)
      .concat(quizApi.middleware)
      .concat(completedQuizApi.middleware),  
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
