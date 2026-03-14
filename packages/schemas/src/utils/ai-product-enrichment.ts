import type { AiDataEnrichmentType } from "@/interfaces/zod-ai-enrichment";
import type { createProductSchemaType } from "@/interfaces/zod-product-schema";

export abstract class AiProductEnrichment {
	abstract execute(
		data: AiDataEnrichmentType,
	): Promise<createProductSchemaType>;
}
