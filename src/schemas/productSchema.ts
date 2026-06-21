import {z} from "zod";


export const productCreateSchema = z.object({
  body:z.object({

    title:z.string()
    .min(2,"title can not be less two character length"),

    descriptions:z.string()
    .min(10,"description too short"),

    image: z.string(),

    price: z.number()
    .positive("goods price can not be less than 0"),

    stockQuantity: z.number()
    .min(0,'quantity can not be less than 0')
    .int(),

    categoryId: z.number()
    })
});

export type productCreateInput = z.infer<typeof productCreateSchema>["body"]; 



