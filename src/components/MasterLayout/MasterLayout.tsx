// MasterLayout.tsx
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../Sidebar/Sidebar";
import { useState, useEffect } from "react";

export default function MasterLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // Close mobile sidebar when switching to desktop
      if (!mobile && isMobileOpen) {
        setIsMobileOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileOpen]);

  const sidebarWidth = isCollapsed ? 64 : 256;

  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Desktop Sidebar */}
      <Sidebar
        isCollapsed={isCollapsed}
        onToggle={() => setIsCollapsed(!isCollapsed)}
        isMobile={false}
        className="hidden md:flex bg-white border-r fixed top-0 left-0 h-full z-40 transition-all duration-300"
      />

      {/* Page content */}
      <main
        className="flex-1 transition-all duration-300 min-h-screen bg-white"
        style={{
          marginLeft: !isMobile ? sidebarWidth : 0,
        }}
      >
        {/* Navbar with integrated mobile dropdown */}
        <div className="bg-slate-400 relative">
          <Navbar 
            onMenuToggle={() => setIsMobileOpen(!isMobileOpen)}
            isMobileMenuOpen={isMobileOpen}
          />
          
          {/* Mobile Dropdown Menu */}
          {isMobileOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg z-50 border-b border-gray-200">
              <Sidebar
                isCollapsed={false}
                onToggle={() => setIsMobileOpen(false)}
                isMobile={true}
                onMobileClose={() => setIsMobileOpen(false)}
                className="w-full relative"
              />
            </div>
          )}
        </div>
        
        <div className="p-5">
          <Outlet />
        </div>
      </main>

      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
}