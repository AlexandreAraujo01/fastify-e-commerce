import type {
	createProductSchemaType,
	findProductType,
	ProductRepositorySchema,
	productSchemaType,
} from "@fastify-e-commerce/schemas";
import { uuidv7 } from "uuidv7";

export class InMemoryProductRepository implements ProductRepositorySchema {
	public products: Map<string, productSchemaType> = new Map();
	async find(data: findProductType): Promise<productSchemaType | null> {
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
	async create(
		data: createProductSchemaType,
	): Promise<productSchemaType | Error> {
		const productAlreadyExists = await this.find({
			name: data.name,
			taxonomie_id: data.taxonomie_id,
		});
		if (productAlreadyExists) {
			return new Error("product already exists");
		}
		const id = uuidv7();
		const product = { ...data, product_id: id, taxonomies: [] };
		this.products.set(id, product);
		return product;
	}
}
