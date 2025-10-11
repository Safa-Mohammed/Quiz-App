// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import type { RootState } from "../../redux/store";
// // import { logout } from "../../features/auth/authSlice";
// import { IoIosArrowDown } from "react-icons/io";

// const NavbarData: React.FC = () => {
// //   const dispatch = useDispatch();
//   const { user } = useSelector((state: RootState) => state.auth);

//   return (
//     <nav className="w-full bg-white border-b border-gray-200 flex items-center justify-between px-4 py-3 sm:px-6 shadow-sm">
//       {/* Left - Title */}
//       <h1 className="text-lg sm:text-xl font-semibold text-gray-800">
//         Dashboard
//       </h1>

//       {/* Center - New quiz button */}
//       <button className="flex items-center gap-2 border border-gray-300 text-sm sm:text-base font-medium text-gray-800 px-4 py-2 rounded-full hover:bg-gray-100 transition">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="w-4 h-4 sm:w-5 sm:h-5"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//           strokeWidth={2}
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M12 6v6m0 0v6m0-6h6m-6 0H6"
//           />
//         </svg>
//         New quiz
//       </button>

//       {/* Right - User info */}
//       <div className="flex items-center gap-2 sm:gap-3">
//         <div className="flex flex-col items-end">
//           <span className="text-sm sm:text-base font-medium text-gray-800">
//             {user?.firstName && user?.lastName
//               ? `${user.firstName} ${user.lastName}`
//               : "User Name"}
//           </span>
//           <span className="text-xs sm:text-sm text-lime-600 font-medium">
//   {user?.role || "Instructor"}
// </span>
//         </div>

//         <IoIosArrowDown  size={18} className="text-gray-500" />

//         {/* Optional logout dropdown (mobile example) */}
//         {/* <button onClick={() => dispatch(logout())} className="text-red-500 text-sm">Logout</button> */}
//       </div>
//     </nav>
//   );
// };

// export default NavbarData;
