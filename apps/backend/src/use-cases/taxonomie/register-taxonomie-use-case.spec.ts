import { InMemoryTaxonomieRepository } from "./../../../../../packages/db/src/in-memory-repository/in-memory-taxonomie-repository";
import { describe, beforeEach, it, expect } from "vitest";
import { RegisterTaxonomieUseCase } from "./register-taxonomie-use-case";
import type {
	CreateTaxonomieSchema,
	TaxonomieRepositorySchema,
} from "@fastify-e-commerce/schemas";

let sut: RegisterTaxonomieUseCase;
let taxRepo: TaxonomieRepositorySchema;
describe("Register taxonomie unit test", () => {
	beforeEach(() => {
		taxRepo = new InMemoryTaxonomieRepository();
		sut = new RegisterTaxonomieUseCase(taxRepo);
	});

	it("should be able to create a new taxonomie", async () => {
		const data: CreateTaxonomieSchema = {
			taxonomie_slug: "graphics-card",
			taxonomie_description: "graphics card to conquer both GAMMING and AI",
			created_at: new Date(),
			updated_at: new Date(),
			products: [],
		};

		const response = await sut.execute(data);
		if (response.isLeft()) {
			expect.fail("the result must be right, but return left");
		}
		expect(response.isRight()).toBe(true);
		expect(response.value.taxonomie_slug).toEqual("graphics-card");
	});

	it("shouldnt be allowed to create duplicated taxonomie", async () => {
		const data: CreateTaxonomieSchema = {
			taxonomie_slug: "graphics-card",
			taxonomie_description: "graphics card to conquer both GAMMING and AI",
			created_at: new Date(),
			updated_at: new Date(),
			products: [],
		};

		await sut.execute(data);
		const response = await sut.execute(data);

		expect(response.isLeft()).toBe(true);
		expect(response.value).toBeInstanceOf(Error);
	});
});
