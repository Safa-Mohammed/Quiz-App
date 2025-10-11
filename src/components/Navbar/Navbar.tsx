import React, { useState, useRef, useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosArrowDown } from "react-icons/io";
import { IoMdStopwatch } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../redux/store";
import { logout } from "../../redux/slices/authSlice";
import { useNavigate, useLocation } from "react-router-dom";

interface NavbarProps {
  onMenuToggle: () => void;
  isMobileMenuOpen: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuToggle }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 📍 Map routes to titles
  const pathTitles: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/dashboard/group-data": "Group Data",
    "/dashboard/group-list": "Group List",
    "/dashboard/resultsTutor": "Results (Tutor)",
    "/resultsView": "Results (View)",
    "/dashboard/student-data": "Student Data",
    "/dashboard/student-list": "Student List",
    "/dashboard/quiz": "Quizzes",
   };

  // 🧠 Get the current title based on the path
  const currentPath = location.pathname;
  const title = pathTitles[currentPath] || "Dashboard";

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white border-b border-gray-200 relative">
      <div className="flex items-center justify-between w-full border-b border-r border-l border-gray-300 border-solid">
        {/* Left: Mobile menu */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onMenuToggle}
            className="md:hidden p-2 rounded-md hover:bg-gray-100 transition"
            aria-label="Toggle menu"
          >
            <RxHamburgerMenu size={24} />
          </button>
        </div>

         {/* Center: Title + New Quiz Button */}
<div className="flex-1 flex items-center px-3 py-3">
  <h1 className="text-lg sm:text-xl font-semibold text-gray-800 flex-1">
    {title}
  </h1>

  <button className="hidden sm:flex items-center gap-2 border border-black border-solid text-sm sm:text-base font-medium text-gray-800 px-3 sm:px-4 py-[9px] rounded-lg hover:bg-gray-100 transition">
    <IoMdStopwatch size={28} />
    New Quiz
  </button>
</div>


        {/* Right: User Info + Dropdown */}
        <div
          className="relative w-56 m-0 border-gray-300 py-3 border-l"
          ref={dropdownRef}
        >
          <div
            className="flex items-center gap-2 sm:gap-3 cursor-pointer select-none"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
          >
            <div className="flex flex-col px-2 text-start">
              <span className="text-sm sm:text-base font-medium text-gray-800">
                {user?.first_name && user?.last_name
                  ? `${user.first_name} ${user.last_name}`
                  : "User Name"}
              </span>
              <span className="text-xs sm:text-sm text-[#C5D86D] font-medium">
                {user?.role || "User"}
              </span>
            </div>

            <IoIosArrowDown
              size={18}
              className={`text-gray-500 transition-transform duration-200 text-right ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </div>

          {/* Dropdown menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg py-2 z-50">
              <button
                onClick={() => {
                  dispatch(logout());
                  setIsDropdownOpen(false);
                  navigate("/");
                }}
                className="w-full text-left px-4 py-2 text-sm text-black hover:bg-gray-200"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Responsive New Quiz button for small screens */}
      <div className="p-2 flex sm:hidden justify-center ">
        <button className="flex items-center gap-2 border border-black text-sm font-medium text-gray-800 px-3 py-2 rounded-lg hover:bg-gray-100 transition">
             <IoMdStopwatch size={20} />

          New Quiz
        </button>
        
      </div>
    </nav>
  );
};

export default Navbar;
