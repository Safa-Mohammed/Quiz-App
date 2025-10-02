// src/modules/shared/components/MasterLayout/MasterLayout.tsx
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../Sidebar/Sidebar";

export default function MasterLayout() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      

      {/* Main area: Sidebar + Content */}
      <div className="flex flex-1">
        {/* Sidebar on left */}
        <Sidebar className="bg-light border-r" />

        {/* Page content on right */}
        <main className="flex-1 bg-gray-50">
           <Navbar />
          <Outlet />
        </main>
      </div>
      
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
}