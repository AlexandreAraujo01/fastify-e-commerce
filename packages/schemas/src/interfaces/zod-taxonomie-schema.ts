import z from "zod";
import { zodProductSchema } from "./zod-product-schema";

export const zodTaxonomieSchema = z.object({
	taxonomie_id: z.string(),
	taxonomie_slug: z.string().min(3),
	taxonomie_description: z.string().min(6),
	created_at: z.coerce.date().default(new Date()),
	updated_at: z.coerce.date().default(new Date()),
	products: z.array(zodProductSchema),
});

export const zodCreateTaxonomieSchema = zodTaxonomieSchema.omit({
	taxonomie_id: true,
});

export const zodFindTaxonomieSchema = z.object({
	taxonomie_id: z.string().optional(),
	taxonomie_slug: z.string().optional(),
});

export type TaxonomieSchema = z.infer<typeof zodTaxonomieSchema>;
export type CreateTaxonomieSchema = z.infer<typeof zodCreateTaxonomieSchema>;
export type FindTaxonomieSchema = z.infer<typeof zodFindTaxonomieSchema>;
