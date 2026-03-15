import {
	type Either,
	type FindTaxonomieSchema,
	left,
	right,
	type TaxonomieRepositorySchema,
	type TaxonomieSchema,
} from "@fastify-e-commerce/schemas";

export class FindTaxonomieUseCase {
	constructor(private taxRepository: TaxonomieRepositorySchema) {}
	async execute(
		data: FindTaxonomieSchema,
	): Promise<Either<Error, TaxonomieSchema>> {
		const response = await this.taxRepository.find(data);
		if (!response) {
			return left(new Error("tax not found"));
		}

		return right(response);
	}
}
