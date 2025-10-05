// src/App.tsx
import Cookies from "js-cookie";
import { setToken } from "./redux/slices/authSlice";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

 

// Shared
import NotFoundPage from "./components/NotFound/NotFoundPage";

//auth layout
import {
  ChangePassword,
  ForgetPassword,
  Login,
  Register,
  ResetPassword,
} from "./pages/AuthLayout";
import { AuthLayout, MasterLayout } from "./components";

//masterlayout
import {
  Dashboard,
  GroupsData,
  GroupsList,
  Quizzes,
  ResultsTutor,
  ResultsView,
  StudentData,
  StudentList,
} from "./pages/MasterLayout";

// import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  const dispatch = useDispatch();
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        { index: true, element: <Login /> },
        { path: "login", element: <Login /> },
        { path: "forget-password", element: <ForgetPassword/> },
        { path: "reset-password", element: <ResetPassword /> },
        { path: "change-password", element: <ChangePassword /> },
        { path: "register", element: <Register /> },
      ],
    },
    {
      path: "/dashboard",
      element: (
        // <ProtectedRoute>
        <MasterLayout />
        // </ProtectedRoute>
      ),
      children: [
        { index: true, element: <Dashboard /> },
        { path: "dashboard", element: <Dashboard /> },
        { path: "group-data", element: <GroupsData /> },
        { path: "group-list", element: <GroupsList /> },
        { path: "resultsTutor", element: <ResultsTutor /> },
        { path: "resultsView", element: <ResultsView /> },
        { path: "student-data", element: <StudentData /> },
        { path: "student-list", element: <StudentList /> },
                { path: "quiz", element: <Quizzes /> },

      ],
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ]);
  useEffect(() => {
    const savedToken = Cookies.get("accessToken");
    if (savedToken) {
      dispatch(setToken(savedToken));
    }
  }, [dispatch]);
  return (
    <div>
      <RouterProvider router={router} />
      <ToastContainer position="top-center" autoClose={5000} />
    </div>
  );
}

export default App;
