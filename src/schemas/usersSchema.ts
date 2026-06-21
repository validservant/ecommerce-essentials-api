import {z} from "zod";

export const registerSchema = z.object({
    body:z.object({
        username:z.string().min(3),
        email:z.string().min(8),
        password:z.string().min(5),
        role:z.string().min(3),
    }),
});

export const loginSchema = z.object({
    body:z.object({
        email:z.string(),
        password:z.string(),
    })
})

export type registerInput = z.infer<typeof  registerSchema>['body'];
export type loginInput = z.infer<typeof loginSchema>['body'];