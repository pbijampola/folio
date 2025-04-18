import { object, string } from "zod";

export const SignInSchema=object({
    email: string({required_error:"Please provide a valid email"}),
    password: string({required_error:"Please provide a valid password"}).min(6)
})