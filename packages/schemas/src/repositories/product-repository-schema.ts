import type {
	createProductSchemaType,
	findProductType,
	productSchemaType,
} from "./../interfaces/zod-product-schema";

export abstract class ProductRepositorySchema {
	abstract find(data: findProductType): Promise<productSchemaType | null>;

	abstract create(
		data: createProductSchemaType,
	): Promise<productSchemaType | Error>;
}
