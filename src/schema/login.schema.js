import {z} from "zod";


export const loginSchema = z.object({
    userName: z.string().max(50, { message: "Username cannot exceed 50 characters" }),
    password:z.string(),
});