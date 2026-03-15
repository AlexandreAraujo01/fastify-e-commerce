import { uuidv7 } from "uuidv7";

import { InMemoryProductRepository } from "@fastify-e-commerce/db";
import { describe, it, beforeEach, expect } from "vitest";
import type { productSchemaType } from "@fastify-e-commerce/schemas";
import { faker } from "@faker-js/faker";
import { DeleteProductUseCase } from "./delete-product-use-case";
import { ProductAlreadyExistsError } from "@fastify-e-commerce/schemas/src/errors/product-already-exists-error";

let sut: DeleteProductUseCase;
let productRepo: InMemoryProductRepository;

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
};

describe("delete product use case unit test", () => {
	beforeEach(() => {
		productRepo = new InMemoryProductRepository();

		sut = new DeleteProductUseCase(productRepo);
		productRepo.products.set(product_uuid, product);
	});

	it("should be able to delete an existing product", async () => {
		const response = await sut.execute(product);
		if (response.isLeft()) {
			expect.fail("return result must be right");
		}
		expect(response.isRight()).toBe(true);
		expect(productRepo.products.size).toEqual(0);
		expect(response.value?.product_id).toEqual(product_uuid);
	});

	it("should not be able to delete a non existing product", async () => {
		const response = await sut.execute({ product_id: uuidv7() });
		expect(response.isLeft()).toBe(true);
		expect(productRepo.products.size).toEqual(1);
		expect(response.value).toBeInstanceOf(ProductAlreadyExistsError);
	});
});
