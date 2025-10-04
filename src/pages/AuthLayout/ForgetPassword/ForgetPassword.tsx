import CustomInputForm from "../../../components/CustomInputForm/CustomInputForm";
import { Auth, axiosInstance } from "../../../services";
import {EmailIcon,CheckIcon} from '../../../assets/Images/SvgIcons/SvgIcons'
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
 interface InputForm{
  email:string
}
interface Res{
message:string
}
export default function ForgetPassword() {

  const {register,formState:{errors,isSubmitting},handleSubmit}=useForm<InputForm>()
let navigate=useNavigate()
const OnSubmit= async(data:InputForm)=>{
try{
let res=await axiosInstance.post<Res>(Auth.forgotPassword,data)
if(res.data.message){
toast.success(res.data.message)
navigate('/reset-password',{state:{email:data.email}})
}
console.log(res.data);

}
catch(error:any){
console.log(error);
toast.error(error?.response?.data?.message||"someThing went wronge")
}}

  return (
    <>
    <section className="w-full  max-w-2xl">
      <p className=" mt-7 mb-16 text-[#C5D86D] text-[25px]">Forget Password</p>
      <form onSubmit={handleSubmit(OnSubmit)}>
      <CustomInputForm
       {...register("email", {
              required: "email is required",
            })}
      icon={<EmailIcon/>}
      lable={"Email address"}
      id="EmailId"
      placeHolder="Enter your mail"
     type="email"
     isError={errors.email}
     errorMessage={errors.email?.message}
      />

       <button 
                type="submit" 
                disabled={isSubmitting} 
                className="auth-button flex items-center justify-center gap-2 ms-2 mt-[88px] mb-[120px]"
              >
                {isSubmitting ? "sending..." : "Send email"}
                <CheckIcon />
              </button>

              
      </form>
      <div className="flex justify-end">
      <p className="text-white">Login? {" "}<Link to='/login' className="text-[#C5D86D] text-[16px]  underline">click here</Link></p>
      </div>
    </section>
    </>
  )
}
