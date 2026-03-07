import { InMemoryUserRepository } from "@fastify-e-commerce/db";
import { describe, it, beforeEach, expect } from "vitest";
import { CreateUserUseCase } from "./create-user-use-case";
import {
  FakeHashHelper,
  type createUserSchemaType,
  type HashHelper,
} from "@fastify-e-commerce/schemas";
import { faker } from "@faker-js/faker";
let sut: CreateUserUseCase;
let userRepo: InMemoryUserRepository;
let hashHelper: HashHelper;
describe("create user use case unit test", () => {
  beforeEach(() => {
    userRepo = new InMemoryUserRepository();
    hashHelper = new FakeHashHelper();
    sut = new CreateUserUseCase(userRepo, hashHelper);
  });

  it("should be able to create a new user", async () => {
    const user: createUserSchemaType = {
      email: "johndoe@example.com",
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      password: faker.internet.password(),
    };

    const response = await sut.execute(user);
    expect(response.isRight()).toBe(true);
    expect(userRepo.users.size).toEqual(1);
    expect(userRepo.users.get("1")?.email).toEqual("johndoe@example.com");
  });

  it("should not be able to create duplicated user", async () => {
    const user: createUserSchemaType = {
      email: "johndoe@example.com",
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      password: faker.internet.password(),
    };

    await sut.execute(user);
    const response = await sut.execute(user);
    expect(response.isLeft()).toBe(true);
    expect(userRepo.users.size).toEqual(1);
    expect(response.value).toBeInstanceOf(Error);
  });
});
