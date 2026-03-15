import {
	ProductNotFoundError,
	UserNotFoundError,
	type createProductSchemaType,
	type findManyProductsSchemaType,
	type findProductSchemaType,
	type ProductRepositorySchema,
	type productSchemaType,
} from "@fastify-e-commerce/schemas";
import { uuidv7 } from "uuidv7";

export class InMemoryProductRepository implements ProductRepositorySchema {
	public products: Map<string, productSchemaType> = new Map();
	async find(data: findProductSchemaType): Promise<productSchemaType | null> {
		const productAlreadyExists = this.products
			.entries()
			.find(([id, product]) => {
				return (
					data.product_id === id ||
					(product.name === data.name &&
						product.taxonomie_id === data.taxonomie_id)
				);
			});
		if (!productAlreadyExists) {
			return null;
		}

		const [_, product] = productAlreadyExists;
		return product;
	}
	async create(data: createProductSchemaType): Promise<productSchemaType> {
		const id = uuidv7();
		const product = { ...data, product_id: id, taxonomies: [] };
		this.products.set(id, product);
		return product;
	}

	async delete(data: {
		id: string;
	}): Promise<productSchemaType | ProductNotFoundError> {
		const product = this.products.get(data.id);
		if (!product) {
			return new ProductNotFoundError();
		}
		this.products.delete(data.id);
		return product;
	}

	findMany(
		data: findManyProductsSchemaType,
	): Promise<productSchemaType[] | Error> {
		throw new Error("Method not implemented.");
	}
}
