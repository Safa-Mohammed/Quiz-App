import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../services";
 
interface Group {
  _id: string;
  name: string;
  students: string[];
}

interface Student {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  img?: string;
  group?: { _id: string; name: string };
  score?: number;
  classRank?: string | number;
}

interface QuizResult {
  quiz?: { _id: string; group?: string; title: string };
  participants?: {
    student?: { _id: string; img?: string };
    score?: number;
    classRank?: string | number;
  }[];
}

interface StudentState {
  groups: Group[];
  students: Student[];
  quizResults: QuizResult[];
  loading: boolean;
  error: string | null;
}

const initialState: StudentState = {
  groups: [],
  students: [],
  quizResults: [],
  loading: false,
  error: null,
};

// ========== createAsyncThunk ==========

// Fetch Groups
export const fetchGroups = createAsyncThunk("student/fetchGroups", async (_, thunkAPI) => {
  try {
    const res = await axiosInstance.get("/group");
    return res.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch groups");
  }
});

// Fetch Students
export const fetchStudents = createAsyncThunk("student/fetchStudents", async (_, thunkAPI) => {
  try {
    const res = await axiosInstance.get("/student");
    return res.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch students");
  }
});

// Fetch Quiz Results
export const fetchQuizResults = createAsyncThunk("student/fetchQuizResults", async (_, thunkAPI) => {
  try {
    const res = await axiosInstance.get("/quiz/result");
    return res.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch quiz results");
  }
});

// ========== Slice ==========

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GROUPS
      .addCase(fetchGroups.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.loading = false;
        state.groups = action.payload;
        state.error = null;
      })
      .addCase(fetchGroups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // STUDENTS
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
        state.error = null;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // QUIZ RESULTS
      .addCase(fetchQuizResults.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchQuizResults.fulfilled, (state, action) => {
        state.loading = false;
        state.quizResults = action.payload;
        state.error = null;
      })
      .addCase(fetchQuizResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default studentSlice.reducer;
