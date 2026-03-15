import z from "zod";
export const zodProductSchema = z.object({
	product_id: z.uuidv7(),
	name: z.string().min(3),
	price: z.number(),
	taxonomie_id: z.uuidv7(),
	attributes: z.json(),
	taxonomies: z.any(),
	created_at: z.coerce.date(),
	updated_at: z.coerce.date(),
});

export const zodCreateProductSchema = zodProductSchema.omit({
	product_id: true,
	taxonomies: true,
});

export const zodFindProduct = z.object({
	product_id: z.uuidv7().optional(),
	name: z.string().min(3).optional(),
	taxonomie_id: z.uuidv7().optional(),
});

export const zodFindManyProducts = z.object({
	name: z.string(),
	taxonomie_id: z.uuidv7().optional(),
});

export type productSchemaType = z.infer<typeof zodProductSchema>;
export type createProductSchemaType = z.infer<typeof zodCreateProductSchema>;
export type findProductSchemaType = z.infer<typeof zodFindProduct>;
export type findManyProductsSchemaType = z.infer<typeof zodFindManyProducts>;
