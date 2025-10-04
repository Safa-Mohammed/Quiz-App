import { forwardRef, type ReactNode } from "react"
import type { FieldError } from "react-hook-form";

interface CustomFormProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string,
  lable: string,
  icon: ReactNode,
  type: string,
  placeHolder: string,
  isError?: FieldError | undefined | boolean;
  errorMessage?: string;
}

const CustomInputForm = forwardRef<HTMLInputElement, CustomFormProps>(
  function CustomInputForm({ id, lable, icon, type, placeHolder, isError, errorMessage, ...rest }, ref) {
    return (
      <div className="flex flex-col gap-1 w-full">
        <label htmlFor={id} className="block mb-2 text-[16px] text-white font-bold">
          {lable}
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-3 flex items-center ps-3.5 pointer-events-none">
            <span className="-ml-4">{icon}</span>
          </div>
          <input 
            ref={ref}
            type={type} 
            id={id} 
            className={`py-3 bg-transparent border ${isError ? 'border-red-500' : 'border-white'} text-white text-sm rounded-lg block w-full ps-10 p-2.5 placeholder-white focus:outline-none focus:ring-2 focus:ring-[#C5D86D]`}
            placeholder={placeHolder}
            {...rest}
          />
        </div>
        {isError && (
          <p className="text-red-500 pl-4">{errorMessage?.toString()}</p>
        )}
      </div>
    )
  }
);

export default CustomInputForm;