import {
  type Either,
  type findManyProductsSchemaType,
  left,
  type ProductRepositorySchema,
  type productSchemaType,
  right,
} from "@fastify-e-commerce/schemas";

export class FindManyProductsUseCase {
  constructor(private productRepository: ProductRepositorySchema) {}

  async execute(
    data: findManyProductsSchemaType,
  ): Promise<Either<Error, productSchemaType[]>> {
    const response = await this.productRepository.findMany(data);
    if (response instanceof Error) {
      return left(response);
    }

    return right(response);
  }
}
