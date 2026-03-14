import {
	type CreateTaxonomieSchema,
	type Either,
	left,
	right,
	type TaxonomieRepositorySchema,
	type TaxonomieSchema,
} from "@fastify-e-commerce/schemas";

export class RegisterTaxonomieUseCase {
	constructor(private taxRepository: TaxonomieRepositorySchema) {}
	async execute(
		data: CreateTaxonomieSchema,
	): Promise<Either<Error, TaxonomieSchema>> {
		const response = await this.taxRepository.create(data);
		if (response instanceof Error) {
			return left(new Error("taxonomie already exists"));
		}

		return right(response);
	}
}
