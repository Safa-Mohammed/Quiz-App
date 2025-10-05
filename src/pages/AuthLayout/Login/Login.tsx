import { useLocation } from 'react-router-dom';
import {SignInIcon,SignUpIcon}from '../../../assets/Images/SvgIcons/SvgIcons'
import CustomAuthTab from '../../../components/CustomAuthTab/CustomAuthTab'
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import inputIcon from '../../../assets/Images/input icon.png'
import mailIcon from '../../../assets/Images/mailIcon.png'
import { Link } from "react-router-dom";
import type { AppDispatch} from "../../../redux/store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../redux/slices/authSlice";
import { EMAILVALIDATION } from '../../../utils/Validation/Validations';
import {PASSWORD_VALIDATION} from '../../../utils/Validation/Validations';
import { toast } from 'react-toastify';
import { useState } from 'react';
import {  FaEye ,FaEyeSlash} from 'react-icons/fa'



export default function Login() {
const dispatch = useDispatch<AppDispatch>();
const navigate = useNavigate()
const [show, setShow] = useState(false)
 const toggleShow = () => {
    setShow(!show)
  }
  const { pathname } = useLocation();
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



 

  const onSubmit: SubmitHandler<LoginFormInputs> = async(data) => {
    dispatch(loginUser(data));
    const resultAction = await dispatch(loginUser(data));
   if (loginUser.rejected.match(resultAction)) {
    console.error("Login failed:", resultAction.payload);
    toast.error(resultAction.payload as string);
    } 
    else 
    {
    toast.success("Login successful!");
            navigate("/dashboard");

    }
    
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
  <label className="block text-white mb-3 font-nunito font-bold text-[16px]">
    Registered email address
  </label>

  <div className="flex items-center border-4 border-white rounded-lg bg-transparent h-12 px-3">
  <img src={mailIcon} alt="email icon" className="w-5 h-5 flex-shrink-0" />

  <input
    type="email"
    {...register("email", EMAILVALIDATION)}
    placeholder="Type your email"
    className="
      flex-1
      bg-transparent
      text-white
      font-nunito font-light text-[14px]
      pl-3
      focus:outline-none
    "
  />
</div>
{errors.email && (
  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
)}
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
     type={show ? "text" : "password"}
      {...register 
    ("password", PASSWORD_VALIDATION)
    }
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
  <FaEye className="absolute right-3 top-1/2 -translate-y-1/2 text-white text-lg" />
     <button
        type="button"
        onClick={toggleShow}
        aria-label={show ? "Hide password" : "Show password"}
        className="absolute inset-y-0 end-3 flex items-center"
        >
        {show ? <FaEye className="text-white" /> : <FaEyeSlash className="text-white" />}
      </button>
  </div>

  {errors.password && (
    <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
  )}
</div>

          {/* Submit */}
<div className="flex items-center justify-between mt-6 gap-6">
  {/* Submit Button */}
  <button onClick={handleSubmit(onSubmit)}
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
