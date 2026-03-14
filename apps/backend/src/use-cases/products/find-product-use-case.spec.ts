import { uuidv7 } from "uuidv7";
import { InMemoryProductRepository } from "./../../../../../packages/db/src/in-memory-repository/in-memory-product-repository";
import { beforeEach, describe, expect, it } from "vitest";
import type { productSchemaType } from "@fastify-e-commerce/schemas";
import { FindProductUseCase } from "./find-product-use-case";

let sut: FindProductUseCase;
let productRepo: InMemoryProductRepository;
const uuid = uuidv7();
const tax_id = uuidv7();
const product: productSchemaType = {
	product_id: uuid,
	name: "RTX 5090",
	price: 22999.99,
	taxonomie_id: tax_id,
	updated_at: new Date(),
	created_at: new Date(),
	taxonomies: [],
	attributes: { vram: "32 GB", vram_type: "ddr7" },
};

describe("find a product unit case", () => {
	beforeEach(() => {
		productRepo = new InMemoryProductRepository();
		sut = new FindProductUseCase(productRepo);
		productRepo.products.set(uuid, product);
	});

	it("should be able to find a existing product (by ID) ", async () => {
		const response = await sut.execute({ product_id: uuid });
		if (response.isLeft()) {
			expect.fail("the result must be right, but return left");
		}

		expect(response.isRight()).toBe(true);
		expect(response.value.name).toEqual("RTX 5090");
	});

	it("should be able to find a existing product (by name) ", async () => {
		const response = await sut.execute({
			name: "RTX 5090",
			taxonomie_id: tax_id,
		});
		if (response.isLeft()) {
			expect.fail("the result must be right, but return left");
		}

		expect(response.isRight()).toBe(true);
		expect(response.value.name).toEqual("RTX 5090");
	});

	it("must return error when cant find product", async () => {
		const response = await sut.execute({ product_id: uuidv7() });
		expect(response.isLeft()).toBe(true);
		expect(response.value).toBeInstanceOf(Error);
	});
});
