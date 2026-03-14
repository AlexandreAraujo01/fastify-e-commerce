import {
	type Either,
	type ProductRepositorySchema,
	type productSchemaType,
	right,
	left,
	type findProductType,
} from "@fastify-e-commerce/schemas";
export class FindProductUseCase {
	constructor(private productRepository: ProductRepositorySchema) {}

	async execute(
		data: findProductType,
	): Promise<Either<Error, productSchemaType>> {
		const response = await this.productRepository.find(data);
		if (!response) {
			return left(new Error("product not found"));
		}

		return right(response);
	}
}
