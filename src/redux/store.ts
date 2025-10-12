import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { studentApi } from "../services/EndPoints/studentApi"; // 👈 import your RTK Query API slice

export const store = configureStore({
  reducer: {
    auth: authReducer,

     [studentApi.reducerPath]: studentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(studentApi.middleware), 
});

// ✅ Types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
