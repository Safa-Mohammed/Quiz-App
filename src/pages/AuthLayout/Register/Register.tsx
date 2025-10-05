import { useLocation, useNavigate } from 'react-router-dom';
import { SignInIcon, SignUpIcon, EmailIcon, NameIcon, CheckIcon } from '../../../assets/Images/SvgIcons/SvgIcons'
import CustomAuthTab from '../../../components/CustomAuthTab/CustomAuthTab'
import { useForm } from "react-hook-form"
import { Auth, axiosInstance } from '../../../services';
import type { RegisterData, RegisterResponce } from '../../../Interfaces/Interfaces'
import { toast } from 'react-toastify';
import CustomInputForm from '../../../components/CustomInputForm/CustomInputForm';
import { EMAILVALIDATION } from '../../../utils/Validation/Validations';
import { useState } from 'react';
import { FaEyeSlash, FaEye, FaKey } from 'react-icons/fa'

function Register() {
  const [show, setShow] = useState(false)
  const toggleShow = () => {
    setShow(!show)
  }
  let navigate=useNavigate()
  const { pathname } = useLocation();
  const { register, formState: { errors, isSubmitting }, handleSubmit } = useForm<RegisterData>()

  const OnSubmit = async (data: RegisterData) => {
    try {
      let res = await axiosInstance.post<RegisterResponce>(Auth.register, data)
      console.log(res);
      navigate("/login")
      toast.success(res?.data?.message)
    }
    catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message || 'Something went wrong')
    }
  }

  return (
    <section className="w-full max-w-2xl">
      <h1 className="auth-label text-[#C5D86D] font-bold text-[25px]">
        Continue your learning journey with QuizWiz!
      </h1>
      
      <div className='flex gap-7 pt-8 pb-6'>
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

      {/* Form */}
      <form 
        onSubmit={handleSubmit(OnSubmit)}
        className="flex flex-col w-full gap-4"
      >
        <div className="flex flex-col md:flex-row justify-between gap-5">
          <CustomInputForm  
            {...register("first_name", {
              required: "First name is required",
            })}
            icon={<NameIcon />}
            id='NameID' 
            lable='Your first name'
            type="text" 
            placeHolder='Type your first name'
            isError={errors.first_name}
            errorMessage={errors.first_name?.message}
          />

          <CustomInputForm 
            {...register("last_name", {
              required: "Last name is required",
            })}
            icon={<NameIcon />}
            id='lastNameID' 
            lable='Your last name'
            type="text" 
            placeHolder='Type your last name'
            isError={errors.last_name}
            errorMessage={errors.last_name?.message}
          />
        </div>
  
        <CustomInputForm  
          {...register("email", EMAILVALIDATION)}
          icon={<EmailIcon />}
          id='EmailId' 
          lable='Your Email'
          type="email" 
          placeHolder='Type your Email'
          isError={errors.email}
          errorMessage={errors.email?.message}
        />
    
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="RoleId" className="block mb-2 text-[16px] text-white font-bold">
            Your Role
          </label>
          <select
            id="RoleId"
            {...register("role", { required: "Role is required" })}
            className="py-3 bg-transparent border border-white text-white text-sm rounded-lg block w-full ps-3.5 p-2.5"
            defaultValue=""
          >
            <option value="" disabled>Choose your role</option>
            <option
              value="Instructor"
              className="bg-gray-200 text-gray-800 hover:bg-green-300">
              Instructor
            </option>
            <option
              value="Student"
              className="bg-gray-200 text-gray-800 hover:bg-green-300">
              Student
            </option>
          </select>

          {errors.role && <p className="text-red-500 pl-4">{errors.role.message}</p>}
        </div>

        {/* Password field with toggle eye */}
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="PasswordId" className="block mb-2 text-[16px] text-white font-bold">
            Your Password
          </label>

          <div className="relative">
            <input
              id="PasswordId"
              type={show ? "text" : "password"}
              {...register("password", { required: "Password is required" })}
              className="py-3 bg-transparent border border-white text-white text-sm rounded-lg block w-full ps-10 p-2.5 pr-12 placeholder-white"
              placeholder="Type your Password"
              autoComplete="current-password"
            />
            
            <FaKey className="absolute left-3 top-1/2 -translate-y-1/2 text-white text-lg" />
            
            <button
              type="button"
              onClick={toggleShow}
              aria-label={show ? "Hide password" : "Show password"}
              className="absolute inset-y-0 end-3 flex items-center"
            >
              {show ? <FaEye className="text-white" /> : <FaEyeSlash className="text-white" />}
            </button>
          </div>

          {errors.password && <p className="text-red-500 pl-4">{errors.password.message}</p>}
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting} 
          className="auth-button flex items-center justify-center gap-2"
        >
          {isSubmitting ? "Signing up..." : "Sign Up"}
          <CheckIcon />
        </button>
      </form>
    </section>
  )
}

export default Register