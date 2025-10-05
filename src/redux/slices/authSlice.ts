
import axios from "axios";
import Cookies from "js-cookie";
import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: any | null;
  token: string | null; 
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  status: "idle",
  error: null,
  token: null,
};

interface LoginResponse {
  profile: any;
  token: string;
}

export const loginUser = createAsyncThunk<
  LoginResponse, 
  { email: string; password: string }, 
  { rejectValue: string } 
>(
  "auth/loginUser",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://upskilling-egypt.com:3005/api/auth/login",
        credentials
      );

      const data = response.data.data;

      Cookies.set("accessToken", data.accessToken, { expires: 1 });
      Cookies.set("refreshToken", data.refreshToken, { expires: 7 });
      return { profile: data.profile, token: data.accessToken };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);






const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload; 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      }).addCase(loginUser.fulfilled, (state, action) => {
  state.status = "succeeded";
  state.user = action.payload.profile;
  state.token = action.payload.token; 
})

  .addCase(loginUser.rejected, (state, action) => {
    state.status = "failed";
    state.error = action.payload as string;
      });
   

  },
});

export const { logout, setToken } = authSlice.actions;
export default authSlice.reducer;
