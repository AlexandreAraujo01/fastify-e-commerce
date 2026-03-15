import type { productSchemaType } from "@/interfaces/zod-product-schema";
import { faker } from "@faker-js/faker";

import { uuidv7 } from "uuidv7";

export function fakeProductMock(
  data?: Partial<productSchemaType>,
): productSchemaType {
  const product_uuid = uuidv7();
  const product: productSchemaType = {
    product_id: product_uuid,
    name: faker.lorem.word(),
    price: faker.number.float(),
    taxonomie_id: faker.lorem.slug(),
    taxonomies: [],
    attributes: [],
    created_at: faker.date.recent(),
    updated_at: faker.date.recent(),
    ...data,
  };

  return product;
}
