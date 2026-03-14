import {
	type Either,
	type createProductSchemaType,
	type ProductRepositorySchema,
	type productSchemaType,
	right,
	left,
} from "@fastify-e-commerce/schemas";
export class RegisterProductUseCase {
	constructor(private productRepository: ProductRepositorySchema) {}

	async execute(
		data: createProductSchemaType,
	): Promise<Either<Error, productSchemaType>> {
		const response = await this.productRepository.create(data);
		if (response instanceof Error) {
			return left(new Error());
		}

		return right(response);
	}
}
