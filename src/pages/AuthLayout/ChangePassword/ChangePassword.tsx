
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useState } from 'react';
import {PASSWORD_VALIDATION} from '../../../utils/Validation/Validations';
import {  FaEye ,FaEyeSlash} from 'react-icons/fa'
import { Auth, axiosInstance } from '../../../services';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import inputIcon from '../../../assets/Images/input icon.png'
import Cookies from "js-cookie";

import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";

export default function ChangePassword(){


  const token = useSelector((state: RootState) => state.auth.token);



   const navigate = useNavigate()
   const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false
  });
 


  const [submitError, setSubmitError] = useState<string>("");

  type ChangePasswordData = {
   password: string;
   password_new: string;
   confirmPassword:string
  }

   interface ChangePasswordRes{
    message:string
   success:boolean
}
    const {
    formState: {errors,isSubmitting},
    handleSubmit,
    watch,
    register,
    reset
  } = useForm<ChangePasswordData>({
      defaultValues: {
      password: "",
      password_new: "", 
    }
  });


  const togglePasswordVisibility = (field: 'old' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };





  const newPassword = watch("password_new");


  const onSubmit: SubmitHandler<ChangePasswordData> = async ({ confirmPassword, ...data}) => {
    try {
     console.log(data)
      setSubmitError("");
      const response = await axiosInstance.post<ChangePasswordRes>(
        Auth.changePassword,
        data,
          {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
        
      );
      
      toast.success(response.data.message);
      reset();  
      navigate("/login");
      
    } catch (error: any) {
      console.error("Change password error:", error);
      
      const errorMessage = error?.response?.data?.message || 
                          error?.message 
      setSubmitError(errorMessage);
      toast.error(errorMessage);
    }
  };


 


   return(
     <>

  <div className="flex flex-col items-start gap-10 w-full">
  <section className="w-full">
     <h1 className="auth-label  text-[#C5D86D]   mb-10 font-bold  text-[25px]">Change password  </h1>
     

   <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

  {/* <div className="space-y-6"> */}
  
   

      {/* OLD PASSWORD */}
<div className="flex items-center border-4 border-white rounded-lg bg-transparent px-3 py-3">
  <img
    src={inputIcon}
    alt="password icon"
    className="w-5 h-5 mr-3"
  />

  <input
    type={showPasswords.old ? "text" : "password"}
    {...register("password", PASSWORD_VALIDATION)}
    className="flex-1 bg-transparent text-white font-nunito font-light text-[14px] outline-none border-none placeholder-gray-300"
    placeholder="Enter old password"
  />

  <button
    type="button"
    onClick={() => togglePasswordVisibility("old")}
    className="ml-3"
  >
    {showPasswords.old ? (
      <FaEyeSlash className="text-white text-lg" />
    ) : (
      <FaEye className="text-white text-lg" />
    )}
  </button>
</div>
{errors.password && (
  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
)}

{/* NEW PASSWORD */}
<div className="flex items-center border-4 border-white rounded-lg bg-transparent px-3 py-3 mt-4">
  <img
    src={inputIcon}
    alt="password icon"
    className="w-5 h-5 mr-3"
  />

  <input
    type={showPasswords.new ? "text" : "password"}
    {...register("password_new", PASSWORD_VALIDATION)}
    className="flex-1 bg-transparent text-white font-nunito font-light text-[14px] outline-none border-none placeholder-gray-300"
    placeholder="Enter new password"
  />

  <button
    type="button"
    onClick={() => togglePasswordVisibility("new")}
    className="ml-3"
  >
    {showPasswords.new ? (
      <FaEyeSlash className="text-white text-lg" />
    ) : (
      <FaEye className="text-white text-lg" />
    )}
  </button>
</div>
{errors.password_new && (
  <p className="text-red-500 text-sm mt-1">{errors.password_new.message}</p>
)}

{/* CONFIRM PASSWORD */}
<div className="flex items-center border-4 border-white rounded-lg bg-transparent px-3 py-3 mt-4">
  <img
    src={inputIcon}
    alt="password icon"
    className="w-5 h-5 mr-3"
  />


<input
  type={showPasswords.confirm ? "text" : "password"}
  {...register("confirmPassword", {
    ...PASSWORD_VALIDATION,
    validate: (value) =>
      value === newPassword || "Passwords do not match",
  })}
  className="flex-1 bg-transparent text-white font-nunito font-light text-[14px] outline-none border-none placeholder-gray-300"
  placeholder="Type your confirm password"
/>
 <button
    type="button"
    onClick={() => togglePasswordVisibility("confirm")}
    className="ml-3"
  >
    {showPasswords.new ? (
      <FaEyeSlash className="text-white text-lg" />
    ) : (
      <FaEye className="text-white text-lg" />
    )}
  </button>
  </div>
  {errors.confirmPassword && (
  <p className="text-red-500 text-sm mt-1">
    {errors.confirmPassword.message}
  </p>
)}



  {/* Submit */}

  {/* Submit Button */}
  <button onClick={handleSubmit(onSubmit)}
    disabled={isSubmitting}
    type="button"
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
