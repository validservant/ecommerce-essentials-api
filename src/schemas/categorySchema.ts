import {z} from "zod";

export const categoryCreateSchema = z.object({
   body: z.object({
    name: z.string()
    .min(1,"name can not be less than 1 character")
    .max(50, "name should not be more than 50 character length"),
    
    description:z.string()
    .min(10,"description too short")
    })
});

export type categoryCreateInput = z.infer<typeof categoryCreateSchema>["body"]; 

export const categoryUpdateSchema = categoryCreateSchema.partial();

export type categoryUpdateInpute = z.infer<typeof categoryUpdateSchema>;