import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/Images/Logo-white.png";
import authimg from "../../assets/Images/authimg.png";

export default function AuthLayout() {
  return (
    <>
      <div className="min-h-screen bg-black flex flex-col md:flex-row">
        {/* Left Section */}
        <div className="flex flex-col p-8 md:w-1/2">
          <img className="w-40 md:w-52 mb-9 mx-auto md:mx-0" src={logo} alt="auth logo" />
          <div className="flex justify-center md:justify-start items-center">
            <Outlet />
          </div>
        </div>

        {/* Right Section */}
        <div className="md:w-1/2 flex items-center justify-center p-5">
          <img className="w-full h-auto object-cover rounded-lg" src={authimg} alt="auth img" />
        </div>
      </div>
    </>
  );
}
