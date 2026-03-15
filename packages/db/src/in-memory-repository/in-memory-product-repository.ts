import {
  ProductNotFoundError,
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

  async findMany(
    data: findManyProductsSchemaType,
  ): Promise<productSchemaType[]> {
    const { taxonomie_id, name } = data;
    const filteredProducts = Array.from(this.products.values()).filter(
      (product) => {
        const matchName = product.name
          .toLowerCase()
          .includes(name.toLowerCase());
        if (taxonomie_id) {
          return matchName && product.taxonomie_id === taxonomie_id;
        }

        return matchName;
      },
    );

    return filteredProducts;
  }
}
