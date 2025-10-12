import  { z } from "zod";


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

export const questionSchema = z.object({
  title: z.string().min(1, "Question's Title is required"),
  description: z.string().min(1, "Question's Description is required"),
  type: z.string().min(1, "Question's Category Type is required"),
  options: z.object({
    A: z.string().min(1, "Option A is required"),
    B: z.string().min(1, "Option B is required"),
    C: z.string().min(1, "Option C is required"),
    D: z.string().min(1, "Option D is required"),
  }),
  answer: z.string().min(1, "Answer is required"),
  difficulty: z.string().min(1, "Difficulty is required"),
});