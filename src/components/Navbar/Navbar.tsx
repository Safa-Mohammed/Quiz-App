// Navbar.tsx
import React from 'react';
import { RxHamburgerMenu } from "react-icons/rx";

interface NavbarProps {
  onMenuToggle: () => void;
  isMobileMenuOpen: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuToggle,  isMobileMenuOpen}) => {
  console.log(isMobileMenuOpen);
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 p-4 relative">
      <div className="flex items-center justify-between">
        {/* Logo and mobile menu button */}
        <div className="flex items-center space-x-4">
          {/* Mobile menu button - only visible on small screens */}
          <button
            onClick={onMenuToggle}
            className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            <RxHamburgerMenu size={24} />
          </button>
          
          {/* Logo - visible on all screens */}
          <div className="text-xl font-semibold">
            Your App Name
          </div>
        </div>
        
        {/* Other navbar content */}
        <div className="flex items-center space-x-4">
          {/* User menu, notifications, etc. */}
          <div className="flex items-center space-x-4">
            {/* Your navbar items */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;