export const EMAILVALIDATION={
  required: "Email is required",
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: "Invalid Email",
  },
}



 export const PASSWORD_VALIDATION={
                required:"Password is Required",

              }
              
 export const CONFIRM_PASSWORD_VALIDATION = (password: string) => ({
  required: "Confirm Password is required",
  validate: (value: string) =>
    value === password || "Passwords do not match",
});