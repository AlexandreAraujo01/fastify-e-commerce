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
		const taxonomieAlreadyExists = await this.taxRepository.find({
			taxonomie_slug: data.taxonomie_slug,
		});
		if (taxonomieAlreadyExists) {
			return left(new Error("tax already exists"));
		}
		const response = await this.taxRepository.create(data);

		return right(response);
	}
}
