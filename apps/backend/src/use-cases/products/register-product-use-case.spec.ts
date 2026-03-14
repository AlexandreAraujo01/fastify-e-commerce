import { uuidv7 } from "uuidv7";
import { InMemoryProductRepository } from "./../../../../../packages/db/src/in-memory-repository/in-memory-product-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { RegisterProductUseCase } from "./register-product-use-case";
import type { createProductSchemaType } from "@fastify-e-commerce/schemas";

let sut: RegisterProductUseCase;
let productRepo: InMemoryProductRepository;
describe("create a product unit case", () => {
	beforeEach(() => {
		productRepo = new InMemoryProductRepository();
		sut = new RegisterProductUseCase(productRepo);
	});

	it("should be able to create a new Product", async () => {
		const new_product: createProductSchemaType = {
			name: "RTX 5090",
			price: 22999.99,
			taxonomie_id: uuidv7(),
			updated_at: new Date(),
			created_at: new Date(),
			attributes: { vram: "32 GB", vram_type: "ddr7" },
		};

		const response = await sut.execute(new_product);
		if (response.isLeft()) {
			expect.fail("the result must be right, but return left");
		}

		expect(response.isRight()).toBe(true);
		expect(response.value.name).toEqual("RTX 5090");
	});

	it("should not be allowed to create 2 products with the same name and taxonomie", async () => {
		const new_product: createProductSchemaType = {
			name: "RTX 5090",
			price: 22999.99,
			taxonomie_id: uuidv7(),
			updated_at: new Date(),
			created_at: new Date(),
			attributes: { vram: "32 GB", vram_type: "ddr7" },
		};

		await sut.execute(new_product);
		const response = await sut.execute(new_product);
		expect(response.isLeft()).toBe(true);
		expect(response.value).toBeInstanceOf(Error);
	});
});
