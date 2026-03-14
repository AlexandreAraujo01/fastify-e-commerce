import { InMemoryTaxonomieRepository } from "./../../../../../packages/db/src/in-memory-repository/in-memory-taxonomie-repository";
import { describe, beforeEach, it, expect } from "vitest";
import { FindTaxonomieUseCase } from "./find-taxonomie-use-case";
import { uuidv7 } from "uuidv7";
import type {
	FindTaxonomieSchema,
	TaxonomieSchema,
} from "@fastify-e-commerce/schemas";

let sut: FindTaxonomieUseCase;
let taxRepo: InMemoryTaxonomieRepository;

//mocked tax to test
const uuid = uuidv7();
const mockedTax: TaxonomieSchema = {
	taxonomie_id: uuid,
	taxonomie_slug: "graphics-card",
	taxonomie_description: "graphics card to conquer both GAMMING and AI",
	created_at: new Date(),
	updated_at: new Date(),
	products: [],
};

describe("Find taxonomie unit test", () => {
	beforeEach(() => {
		taxRepo = new InMemoryTaxonomieRepository();
		sut = new FindTaxonomieUseCase(taxRepo);
		taxRepo.taxonomies.set(uuid, mockedTax);
	});

	it("should be able to find a taxonomie that already exists (by ID)", async () => {
		const data: FindTaxonomieSchema = {
			taxonomie_id: uuid,
		};

		const response = await sut.execute(data);
		if (response.isLeft()) {
			expect.fail("the result must be right, but return left");
		}
		expect(response.isRight()).toBe(true);
		expect(response.value.taxonomie_slug).toEqual("graphics-card");
		expect(response.value.taxonomie_id).toEqual(uuid);
	});

	it("should be able to find a taxonomie that already exists (by SLUG)", async () => {
		const data: FindTaxonomieSchema = {
			taxonomie_slug: "graphics-card",
		};

		const response = await sut.execute(data);
		if (response.isLeft()) {
			expect.fail("the result must be right, but return left");
		}
		expect(response.isRight()).toBe(true);
		expect(response.value.taxonomie_slug).toEqual("graphics-card");
		expect(response.value.taxonomie_id).toEqual(uuid);
	});

	it("should be able to return undefined when tax are not found", async () => {
		const response = await sut.execute({ taxonomie_slug: "non-existent" });

		expect(response.isLeft()).toBe(true);
		expect(response.value).toBeUndefined();
	});
});
