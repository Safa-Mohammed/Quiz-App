import React, { useState } from "react";
import { FiUser } from "react-icons/fi";
import { RiHome6Line } from "react-icons/ri";
import { PiStudentThin } from "react-icons/pi";
import { MdOutlineGroups, MdOutlineQuiz, MdOutlineLogout } from "react-icons/md";
import { IoNewspaperOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { LiaUserLockSolid } from "react-icons/lia";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { logoIcon } from "../../assets/Images";

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  isMobile: boolean;
  className?: string;
  onMobileClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  onToggle,
  isMobile,
  className,
  onMobileClose,
}) => {
  const iconSize = 24;
  const [activeId, setActiveId] = useState<string>("home");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const menuItems = [
    { id: "home", label: "Dashboard", icon: <RiHome6Line size={iconSize} />, path: "/dashboard" },
    { id: "Students", label: "Students", icon: <PiStudentThin size={iconSize} />, path: "/dashboard/student-list" },
    { id: "Groups", label: "Groups", icon: <MdOutlineGroups size={iconSize} />, path: "/dashboard/group-list" },
    { id: "Quizzes", label: "Quizzes", icon: <MdOutlineQuiz size={iconSize} />, path: "/dashboard/quiz" },
    { id: "Results", label: "Results", icon: <IoNewspaperOutline size={iconSize} />, path: "/dashboard/resultsView" },
    { id: "changePassword", label: "Change Password", icon: <LiaUserLockSolid size={iconSize} />, path: "/change-password" },
    { id: "Logout", label: "Logout", icon: <MdOutlineLogout size={iconSize} />, action: handleLogout },
  ];

  const handleItemClick = (itemId: string) => {
    setActiveId(itemId);
    if (isMobile && onMobileClose) {
      onMobileClose();
    }
  };

  // Mobile Sidebar
  if (isMobile) {
    return (
      <div className={`${className} bg-white`}>
        <nav className="flex-0">
          <ul className="space-y-0 p-0">
            {menuItems.map((item) => (
              <li
                key={item.id}
                className={`border-t border-b border-gray-400 py-2 ${
                  activeId === item.id ? "border-r-8 border-r-black" : "border-r-0"
                }`}
              >
                {item.action ? (
                  <button
                    onClick={() => {
                      item.action();
                      handleItemClick(item.id);
                    }}
                    className="flex items-center p-4 w-full text-left rounded transition-colors"
                  >
                    <div
                      className={`w-10 h-10 flex items-center justify-center text-white rounded-md ${
                        activeId === item.id ? "bg-black text-[#edd9ca]" : "bg-[#FFEDDF] text-[#070606]"
                      }`}
                    >
                      {item.icon}
                    </div>
                    <span className="ml-4">{item.label}</span>
                  </button>
                ) : (
                  <Link
                    to={item.path}
                    onClick={() => handleItemClick(item.id)}
                    className="flex items-center p-4 rounded transition-colors"
                  >
                    <div
                      className={`w-10 h-10 flex items-center justify-center text-white rounded-md ${
                        activeId === item.id ? "bg-black text-[#edd9ca]" : "bg-[#FFEDDF] text-[#070606]"
                      }`}
                    >
                      {item.icon}
                    </div>
                    <span className="ml-4">{item.label}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-3 border-t border-gray-200 flex flex-col gap-2">
          <Link
            to="/help"
            onClick={() => onMobileClose?.()}
            className="flex items-center p-2 rounded transition-colors"
          >
            <div className="w-10 h-10 flex items-center justify-center bg-[#FFEDDF] rounded-md text-black">
              <FiUser size={iconSize} />
            </div>
            <span className="ml-3 font-medium">Help</span>
          </Link>
        </div>
      </div>
    );
  }

  // Desktop Sidebar
  return (
    <div
      className={`${className} flex flex-col transition-all duration-300 bg-white`}
      style={{ width: isCollapsed ? 77 : 256 }}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!isCollapsed && <img src={logoIcon} alt="Logo" />}
        <button
          onClick={onToggle}
          className="p-2 rounded hover:bg-gray-100 transition-colors"
        >
          <RxHamburgerMenu size={iconSize} />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-0 p-0">
          {menuItems.map((item) => (
            <li
              key={item.id}
              className={`border-t border-b border-gray-400 py-2 ${
                activeId === item.id ? "border-r-8 border-r-black" : "border-r-0"
              }`}
            >
              {item.action ? (
                <button
                  onClick={() => {
                    item.action();
                    handleItemClick(item.id);
                  }}
                  className="flex items-center p-2 w-full text-left rounded transition-colors"
                >
                  <div
                    className={`w-10 h-10 flex items-center justify-center text-white rounded-md ${
                      activeId === item.id ? "bg-black text-[#edd9ca]" : "bg-[#FFEDDF] text-[#070606]"
                    }`}
                  >
                    {item.icon}
                  </div>
                  {!isCollapsed && <span className="ml-4">{item.label}</span>}
                </button>
              ) : (
                <Link
                  to={item.path}
                  onClick={() => handleItemClick(item.id)}
                  className="flex items-center p-2 rounded transition-colors"
                >
                  <div
                    className={`w-10 h-10 flex items-center justify-center text-white rounded-md ${
                      activeId === item.id ? "bg-black text-[#edd9ca]" : "bg-[#FFEDDF] text-[#070606]"
                    }`}
                  >
                    {item.icon}
                  </div>
                  {!isCollapsed && <span className="ml-4">{item.label}</span>}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-2 border-t border-gray-200 mt-auto flex flex-col gap-2">
        <Link to="/help" className="flex items-center py-2 rounded transition-colors">
          <div className="w-10 h-10 flex items-center justify-center bg-[#FFEDDF] rounded-md text-black">
            <FiUser size={iconSize} />
          </div>
          {!isCollapsed && <span className="ml-3 mt-2 font-medium">Help</span>}
        </Link>

     
      </div>
    </div>
  );
};

export default Sidebar;
