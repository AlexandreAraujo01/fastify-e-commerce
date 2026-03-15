import {
	type Either,
	type ProductRepositorySchema,
	type productSchemaType,
	right,
	left,
	type findProductSchemaType,
	ProductNotFoundError,
} from "@fastify-e-commerce/schemas";
import { ProductAlreadyExistsError } from "@fastify-e-commerce/schemas/src/errors/product-already-exists-error";
export class DeleteProductUseCase {
	constructor(private productRepository: ProductRepositorySchema) {}

	async execute(
		data: findProductSchemaType,
	): Promise<Either<Error, productSchemaType>> {
		const productAlreadyExists = await this.productRepository.find(data);
		if (!productAlreadyExists) {
			return left(new ProductAlreadyExistsError("product already exists"));
		}
		const response = await this.productRepository.delete({
			id: productAlreadyExists.product_id,
		});
		if (response instanceof Error) {
			return left(new ProductNotFoundError());
		}

		return right(response);
	}
}
