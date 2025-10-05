import { useLocation, useNavigate } from "react-router-dom";
import { Auth, axiosInstance } from "../../../services";
import { useForm } from "react-hook-form";
import CustomInputForm from "../../../components/CustomInputForm/CustomInputForm";
import { EMAILVALIDATION } from "../../../utils/Validation/Validations";
import { CheckIcon, EmailIcon } from "../../../assets/Images/SvgIcons/SvgIcons";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash, FaKey } from "react-icons/fa";
import { toast } from "react-toastify";

interface FormData {
  otp: string;
  email: string;
  password: string;
  passwordConf: string;
}

interface Res {
  message: string;
}

export default function ResetPassword() {
  const { state } = useLocation();
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow((s) => !s);

  const [showp, setShowp] = useState(false);
  const toggleShowp = () => setShowp((s) => !s);

  const navigate = useNavigate();

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    watch,
    trigger,
  } = useForm<FormData>({
    defaultValues: { email: state?.email ?? "" },
  });

  const OnSubmit = async (data: FormData) => {
    try {
      const res = await axiosInstance.post<Res>(Auth.resetPassword, data);
      console.log(res);
      if (res.data?.message) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const password = watch("password");

  useEffect(() => {
    if (watch("passwordConf")) {
      trigger("passwordConf");
    }
  }, [password, trigger]);

  return (
    <>
      <section className="w-full max-w-2xl">
        <p className="mt-7 mb-16 text-[#C5D86D] text-[25px]">Reset Password</p>
        <form onSubmit={handleSubmit(OnSubmit)} className="flex flex-col w-full gap-4">
          <CustomInputForm
            {...register("email", EMAILVALIDATION)}
            icon={<EmailIcon />}
            id="EmailId"
            lable="Your Email"
            type="email"
            placeHolder="Type your Email"
            isError={errors.email}
            errorMessage={errors.email?.message}
            disabled
          />

          <CustomInputForm
            {...register("otp", { required: "هذا الحقل مطلوب" })}
            icon={<CheckIcon />}
            id="otpId"
             lable="OTP"
            type="text"
            placeHolder="Type your otp"
            isError={errors.otp}
            errorMessage={errors.otp?.message}
          />

          {/* Password field with toggle eye */}
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="PasswordId" className="block mb-2 text-[16px] text-white font-bold">
              Your Password
            </label>

            <div className="relative">
              <input
                id="PasswordId"
                type={show ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Password must be at least 6 characters" },
                })}
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

          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="confPasswordId" className="block mb-2 text-[16px] text-white font-bold">
              Confirm Password
            </label>

            <div className="relative">
              <input
                id="confPasswordId"
                type={showp ? "text" : "password"}
                {...register("passwordConf", {
                  required: "Confirm Password is required",
                  validate: (passwordConf) =>
                    passwordConf === watch("password") || "Password and confirm password do not match",
                })}
                className="py-3 bg-transparent border border-white text-white text-sm rounded-lg block w-full ps-10 p-2.5 pr-12 placeholder-white"
                placeholder="confirm your Password"
                autoComplete="current-password"
              />

              <FaKey className="absolute left-3 top-1/2 -translate-y-1/2 text-white text-lg" />

              <button
                type="button"
                onClick={toggleShowp}
                aria-label={showp ? "Hide password" : "Show password"}
                className="absolute inset-y-0 end-3 flex items-center"
              >
                {showp ? <FaEye className="text-white" /> : <FaEyeSlash className="text-white" />}
              </button>
            </div>

            {errors.passwordConf && <p className="text-red-500 pl-4">{errors.passwordConf.message}</p>}
          </div>

          <button type="submit" disabled={isSubmitting} className="auth-button flex items-center justify-center gap-2">
            {isSubmitting ? "submitting..." : "Reset"}
            <CheckIcon />
          </button>
        </form>
      </section>
    </>
  );
}
