import {
	type Either,
	type ProductRepositorySchema,
	type productSchemaType,
	right,
	left,
	type findProductSchemaType,
	ProductNotFoundError,
} from "@fastify-e-commerce/schemas";
export class FindProductUseCase {
	constructor(private productRepository: ProductRepositorySchema) {}

	async execute(
		data: findProductSchemaType,
	): Promise<Either<Error, productSchemaType>> {
		const response = await this.productRepository.find(data);
		if (!response) {
			return left(new ProductNotFoundError());
		}

		return right(response);
	}
}
