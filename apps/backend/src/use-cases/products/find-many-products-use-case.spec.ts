import { InMemoryProductRepository } from "@fastify-e-commerce/db";
import { describe, it, beforeEach, expect } from "vitest";
import { fakeProductMock } from "@fastify-e-commerce/schemas";
import { FindManyProductsUseCase } from "./find-many-products-use-case";

let sut: FindManyProductsUseCase;
let productRepo: InMemoryProductRepository;

describe("find many product use case unit test", () => {
  beforeEach(() => {
    productRepo = new InMemoryProductRepository();

    sut = new FindManyProductsUseCase(productRepo);
    const product = fakeProductMock({
      name: "RTX 2080TI",
      taxonomie_id: "graphics-card",
    });
    const second_product = fakeProductMock({
      name: "RTX 5090",
      taxonomie_id: "graphics-card",
    });
    const third_product = fakeProductMock({
      name: "RTX 4060TI",
      taxonomie_id: "graphics-card",
    });

    const fourth_product = fakeProductMock({
      name: "RX 7600",
      taxonomie_id: "graphics-card",
    });
    productRepo.products.set(product.product_id, product);
    productRepo.products.set(second_product.product_id, second_product);
    productRepo.products.set(third_product.product_id, third_product);
    productRepo.products.set(fourth_product.product_id, fourth_product);
  });

  it("should be able to find  many products (by Name)", async () => {
    const response = await sut.execute({ name: "RTX" });
    if (response.isLeft()) {
      expect.fail("return result must be right");
    }
    expect(response.isRight()).toBe(true);
    expect(response.value.length).toEqual(3);
  });

  it("should be able to find  many products (by Taxonomie_id)", async () => {
    const response = await sut.execute({
      taxonomie_id: "graphics-card",
      name: "",
    });
    if (response.isLeft()) {
      expect.fail("return result must be right");
    }
    expect(response.isRight()).toBe(true);
    expect(response.value.length).toEqual(4);
  });
});
