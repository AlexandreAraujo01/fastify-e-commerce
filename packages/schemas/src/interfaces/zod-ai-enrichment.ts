import z from "zod";

export const zodAiDataEnrichment = z.object({
	product_name: z.string().min(3),
	description: z.string().min(10),
});

export type AiDataEnrichmentType = z.infer<typeof zodAiDataEnrichment>;
