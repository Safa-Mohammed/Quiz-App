// src/App.tsx

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

 

 

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
  ResultsTutor,
  ResultsView,
  StudentData,
  StudentList,
} from "./pages/MasterLayout";

// import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
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
      ],
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
}

export default App;
