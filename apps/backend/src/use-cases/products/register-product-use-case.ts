import { ProductAlreadyExistsError } from "./../../../../../packages/schemas/src/errors/product-already-exists-error";
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
		const alreadyExists = await this.productRepository.find({
			name: data.name,
			taxonomie_id: data.taxonomie_id,
		});
		if (alreadyExists) {
			return left(new ProductAlreadyExistsError(data.name));
		}

		const response = await this.productRepository.create(data);

		if (response instanceof Error) {
			return left(response);
		}

		return right(response);
	}
}
