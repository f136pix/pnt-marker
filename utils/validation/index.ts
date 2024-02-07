import {z} from 'zod';

const phoneRegex = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);
export const loginValidationSchema = z.object({
    email: z.string().email({message: 'Must be a valid email'}),
    password: z.string().min(8, {message: 'Must have at least 8 characters'}),
});
export const registerValidationSchema = z
    .object({
        email: z.string().email({message: 'Must be a valid email'}),
        password: z.string().min(8, {message: 'Must have at least 8 characters'}),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    });

export const registerCompanySchema = z.object({
    name: z.string().min(2, {message: 'Must have at least 2 characters'}),
    email: z.string().email({message: 'Must be a valid email'}),
    phone: z.string().regex(phoneRegex, 'Invalid number'),
    image: z.any()
});
