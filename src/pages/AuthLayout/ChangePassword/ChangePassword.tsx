 

 import { useLocation } from 'react-router-dom';
import {SignInIcon,SignUpIcon}from '../../../assets/Images/SvgIcons/SvgIcons'
import CustomAuthTab from '../../../components/CustomAuthTab/CustomAuthTab'
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import inputIcon from '../../../assets/Images/input icon.png'
import { useState } from 'react';
export default function ChangePassword() {

  const { pathname } = useLocation();
  const [loading, setLoading] = useState(false);  
  type changepasswordFormInputs = {
   password: string;
   password_new: string;
  }

    const {
    register,
    handleSubmit,
    formState: { errors },
    } =
     useForm<changepasswordFormInputs>({
    defaultValues: { password: "", password_new: "" },
  });




    const onSubmit: SubmitHandler<changepasswordFormInputs> = async (data) => {
    setLoading(true); 
  };
   return(
     <>

  <div className="flex flex-col items-start gap-10 w-full">
    <section className="w-full">
     <h1 className="auth-label  text-[#C5D86D]   mb-10 font-bold  text-[25px]">
   Change password      </h1>
     

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

    {/* old Password */}
   <div>
  <label className="block text-white font-nunito font-bold text-[16px] leading-[100%] tracking-[0%] mb-3">
    Old Password
  </label>

  <div className="relative">
    {/* Password Icon */}
    <img
      src={inputIcon}
      alt="password icon"
      className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
    />

    {/* Input */}
    <input
      type="password"
      {...register("password", {
        required: "Type your password",
        minLength: {
          value: 6,
          message: "Password must be at least 6 characters",
        },
      })}
      className="
        w-full 
        pl-10 pr-4 py-3      
        border-4 border-white   
        rounded-lg        
        bg-transparent
        text-white
        font-nunito font-light text-[14px] leading-[100%] tracking-[0%]
      "
      placeholder="Type your old password"
    />
  </div>

  {errors.password && (
    <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
  )}
  </div>


     {/* New Password */}
   <div>
  <label className="block text-white font-nunito font-bold text-[16px] leading-[100%] tracking-[0%] mb-3">
    New Password
  </label>

  <div className="relative">
    {/* Password Icon */}
    <img
      src={inputIcon}
      alt="password icon"
      className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
    />

    {/* Input */}
    <input
      type="password"
      {...register("password", {
        required: "Type your password",
        minLength: {
          value: 6,
          message: "Password must be at least 6 characters",
        },
      })}
      className="
        w-full 
        pl-10 pr-4 py-3      
        border-4 border-white   
        rounded-lg        
        bg-transparent
        text-white
        font-nunito font-light text-[14px] leading-[100%] tracking-[0%]
      "
      placeholder="Type your new password"
    />
  </div>

  {errors.password && (
    <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
  )}
  </div>


     {/* Confirm New Password */}
   <div>
  <label className="block text-white font-nunito font-bold text-[16px] leading-[100%] tracking-[0%] mb-3">
    Confirm New Password
  </label>

  <div className="relative">
    {/* Password Icon */}
    <img
      src={inputIcon}
      alt="password icon"
      className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
    />

    {/* Input */}
    <input
      type="password"
      {...register("password", {
        required: "Type your password",
        minLength: {
          value: 6,
          message: "Password must be at least 6 characters",
        },
      })}
      className="
        w-full 
        pl-10 pr-4 py-3      
        border-4 border-white   
        rounded-lg        
        bg-transparent
        text-white
        font-nunito font-light text-[14px] leading-[100%] tracking-[0%]
      "
      placeholder="Type your confirm password"
    />
  </div>

  {errors.password && (
    <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
  )}
  </div>

  {/* Submit */}

  {/* Submit Button */}
  <button
    type="submit"
    className="
      bg-white text-black
      py-3 px-6
      rounded-lg
      font-nunito font-bold text-[16px]
      flex items-center justify-center gap-3
      hover:bg-[#C5D86D]
      transition
    "
  >
    Change
    <span className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center font-bold text-[16px]">
      ✓
    </span>
  </button>

 


        </form>
    
    </section>
    </div>
    </>
  )
  
}
