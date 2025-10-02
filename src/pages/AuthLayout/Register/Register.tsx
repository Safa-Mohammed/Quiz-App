import { useLocation } from 'react-router-dom';
import {SignInIcon,SignUpIcon}from '../../../assets/Images/SvgIcons/SvgIcons'
import CustomAuthTab from '../../../components/CustomAuthTab/CustomAuthTab'
 
function Register() {
   const { pathname } = useLocation();
  return (
    <>
  <section>
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
    </>
  )
}

export default Register