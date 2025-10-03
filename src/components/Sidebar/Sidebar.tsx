import React, { useState } from "react";
import { FiUser } from "react-icons/fi";
import { RiHome6Line } from "react-icons/ri";
import { MdOutlineGroups, MdOutlineQuiz } from "react-icons/md";
import { IoNewspaperOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
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

  const menuItems = [
    { id: "home", label: "Dashboard", icon: <RiHome6Line size={iconSize} />, path: "/dashboard" },
    { id: "Students", label: "Students", icon: <RiHome6Line size={iconSize} />, path: "/dashboard/resultsView" },
    { id: "Groups", label: "Groups", icon: <MdOutlineGroups size={iconSize} />, path: "/dashboard/resultsView" },
    { id: "Quizzes", label: "Quizzes", icon: <MdOutlineQuiz size={iconSize} />, path: "/dashboard/resultsView" },
    { id: "Results", label: "Results", icon: <IoNewspaperOutline size={iconSize} />, path: "/dashboard/resultsView" },
  ];

  const handleItemClick = (itemId: string) => {
    setActiveId(itemId);
    if (isMobile && onMobileClose) {
      onMobileClose();
    }
  };

  // For mobile dropdown, we don't need the header with logo and close button
  if (isMobile) {
    return (
      <div className={`${className} bg-white`}>
        {/* Menu Items Only for Mobile Dropdown */}
        <nav className="flex-1">
          <ul className="space-y-0 p-0">
            {menuItems.map((item) => (
              <li
                key={item.id}
                className={`border-t border-b border-gray-400 py-2 ${
                  activeId === item.id ? "border-r-8 border-r-black" : "border-r-0"
                }`}
              >
                <Link
                  to={item.path}
                  onClick={() => handleItemClick(item.id)}
                  className="flex items-center p-4 rounded transition-colors"
                >
                  <div
                    className={`w-10 h-10 flex items-center justify-center text-white rounded-md ${
                      activeId === item.id ? "bg-black text-[#FFEDDF]" : "bg-[#FFEDDF] text-[#070606]"
                    }`}
                  >
                    {item.icon}
                  </div>
                  <span className="ml-4">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer for Mobile */}
        <div className="p-3 border-t border-gray-200">
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

  // Original desktop sidebar
  return (
    <div
      className={`${className} flex flex-col transition-all duration-300 bg-white`}
      style={{ width: isCollapsed ? 77 : 256 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!isCollapsed && (
          <img src={logoIcon} alt="Logo" />
        )}
        <button
          onClick={onToggle}
          className="p-2 rounded hover:bg-gray-100 transition-colors"
        >
          {isCollapsed ? (
            <RxHamburgerMenu size={iconSize} />
          ) : (
            <RxHamburgerMenu size={iconSize} />
          )}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-0 p-0">
          {menuItems.map((item) => (
            <li
              key={item.id}
              className={`border-t border-b border-gray-400 py-2 ${
                activeId === item.id ? "border-r-8 border-r-black" : "border-r-0"
              }`}
            >
              <Link
                to={item.path}
                onClick={() => handleItemClick(item.id)}
                className="flex items-center p-4 rounded transition-colors"
              >
                <div
                  className={`w-10 h-10 flex items-center justify-center text-white rounded-md ${
                    activeId === item.id ? "bg-black text-[#FFEDDF]" : "bg-[#FFEDDF] text-[#070606]"
                  }`}
                >
                  {item.icon}
                </div>
                {!isCollapsed && <span className="ml-4">{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

   
     {/* Footer */}
<div className="p-3 border-t border-gray-200 mt-auto">
  <Link
    to="/help"
    className="flex  p-2 rounded transition-colors "
  >
    <div className="w-10 h-10 flex items-center justify-center bg-[#FFEDDF] rounded-md text-black">
      <FiUser size={iconSize} />
    </div>
    {!isCollapsed && <span className="ml-3 font-medium">Help</span>}
  </Link>
</div>

    </div>
  );
};

export default Sidebar;