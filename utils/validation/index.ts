import {object, string, z} from 'zod';

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

export const timeValidationSchema = object({
    entryTime: string()
        .transform((val) => {
            const timeParts = val.split(":");
            if (timeParts.length !== 2 ||
                isNaN(parseInt(timeParts[0])) ||
                isNaN(parseInt(timeParts[1])) ||
                parseInt(timeParts[0]) < 0 ||
                parseInt(timeParts[0]) > 23 ||
                parseInt(timeParts[1]) < 0 ||
                parseInt(timeParts[1]) > 59) {
                throw new Error("Invalid entry time format (HH:MM)");
            }
            return new Date(0, 0, 0, timeParts[0], timeParts[1]);
        })
        .refine((val) => val < timeValidationSchema.lunchTime), // Entry time before lunch time
    exitTime: string()
        .transform((val) => {
            const timeParts = val.split(":");
            if (timeParts.length !== 2 ||
                isNaN(parseInt(timeParts[0])) ||
                isNaN(parseInt(timeParts[1])) ||
                parseInt(timeParts[0]) < 0 ||
                parseInt(timeParts[0]) > 23 ||
                parseInt(timeParts[1]) < 0 ||
                parseInt(timeParts[1]) > 59) {
                throw new Error("Invalid exit time format (HH:MM)");
            }
            return new Date(0, 0, 0, timeParts[0], timeParts[1]);
        })
        .refine((val) => val > timeValidationSchema.lunchTime), // exit time after lunch time
    lunchTime: string()
        .transform((val) => {
            const timeRegex = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/; // HH:MM format
            if (timeRegex.test(val)) {
                const timeParts = val.split(":");
                return new Date(0, 0, 0, timeParts[0], timeParts[1]);
            } else {
                throw new Error("Invalid lunch time format (HH:MM)");
            }
        }),
});





