import type {
	createProductSchemaType,
	findManyProductsSchemaType,
	findProductSchemaType,
	productSchemaType,
} from "./../interfaces/zod-product-schema";

export abstract class ProductRepositorySchema {
	abstract find(data: findProductSchemaType): Promise<productSchemaType | null>;

	abstract create(
		data: createProductSchemaType,
	): Promise<productSchemaType | Error>;

	abstract findMany(
		data: findManyProductsSchemaType,
	): Promise<productSchemaType[] | Error>;

	abstract delete(data: { id: string }): Promise<productSchemaType | Error>;
}
