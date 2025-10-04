import { useLocation } from 'react-router-dom';
import {SignInIcon,SignUpIcon}from '../../../assets/Images/SvgIcons/SvgIcons'
import CustomAuthTab from '../../../components/CustomAuthTab/CustomAuthTab'
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import inputIcon from '../../../assets/Images/input icon.png'
import mailIcon from '../../../assets/Images/mailIcon.png'
import { useState } from 'react';
import { Link } from "react-router-dom";


export default function Login() {


   const { pathname } = useLocation();
   const [loading, setLoading] = useState(false);  
   type LoginFormInputs = {
  email: string;
  password: string;
};




    const {
    register,
    handleSubmit,
    formState: { errors },
    } = useForm<LoginFormInputs>({
    defaultValues: { email: "", password: "" },
  });




    const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setLoading(true); 
  
  };
   return(
     <>

  <div className="flex flex-col items-start gap-10 w-full">
  <section className="w-full">
      <h1 className="auth-label  text-[#C5D86D]   font-bold  text-[25px]">
        Continue your learning journey with QuizWiz!
      </h1>
    <div className=' flex gap-7 pt-8 pb-6 '>
     <CustomAuthTab
          icon={
            <SignInIcon
              color={
                pathname === "/login" || pathname === "/" ? "#C5D86D" : "#fff"
              }
            />
          }
          label="Sign in"
          border={
            pathname === "/login" || pathname === "/"
              ? "border-[#C5D86D] border-4"
              : ""
          }
        />
        <CustomAuthTab
          icon={
            <SignUpIcon color={pathname === "/register" ? "#C5D86D" : "#fff"} />
          }
          label="Sign up"
          border={pathname === "/register" ? "border-[#C5D86D] border-4" : ""}
        />
      </div>
     </section>

    <section className="w-full">
 
     

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">



      {/* Email */}
      <div>
            <label className="block text-white mb-3 font-nunito font-bold text-[16px] leading-[100%] tracking-[0%]">Registered email address</label>
             <div className="relative"> 

                <img
      src={mailIcon}
      alt="password icon"
      className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
    />
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
       className="
      w-full 
      px-4  
      pl-10 pr-4 py-3         
      border-4 border-white   
      rounded-lg        
      bg-transparent
      font-nunito font-light text-[14px] leading-[100%] tracking-[0%] 
      pb-5
    "      placeholder="Type your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
             </div>

      </div>


 


    {/* Password */}
   <div>
  <label className="block text-white font-nunito font-bold text-[16px] leading-[100%] tracking-[0%] mb-3">
    Password
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
      placeholder="Type your password"
    />
  </div>

  {errors.password && (
    <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
  )}
</div>

          {/* Submit */}
<div className="flex items-center justify-between mt-6 gap-6">
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
    Sign Up
    <span className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center font-bold text-[16px]">
      ✓
    </span>
  </button>

  {/* Forgot Password Link */}
  <div className="text-right">
    <h1 className="text-white font-nunito text-[16px]">
      Forgot password?{" "}
      <Link
        to="/reset-pass"
        className="text-[#C5D86D] font-bold hover:underline"
      >
        Click here
      </Link>
    </h1>
  </div>
</div>

        </form>
    
    </section>
    </div>
    </>
  )
  
}
