import {z} from "zod";

export const loginValidationSchema = z.object({
    email: z.string().email({message: 'Must be a valid email'}),
    password: z.string().min(8, {message: 'Must have at least 8 characters'})
})
export const registerValidationSchema = z.object({
    email: z.string().email({message: 'Must be a valid email'}),
    password: z.string().min(8, {message: 'Must have at least 8 characters'}),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export const registerCompanySchema = z.object({

})

