import type {
	CreateTaxonomieSchema,
	FindTaxonomieSchema,
	TaxonomieSchema,
} from "@/interfaces/zod-taxonomie-schema";

export abstract class TaxonomieRepositorySchema {
	abstract create(
		data: CreateTaxonomieSchema,
	): Promise<TaxonomieSchema | Error>;

	abstract find(
		data: FindTaxonomieSchema,
	): Promise<TaxonomieSchema | undefined>;
}
