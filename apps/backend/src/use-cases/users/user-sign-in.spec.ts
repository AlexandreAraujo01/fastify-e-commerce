import { uuidv7 } from "uuidv7";
import { InMemoryUserRepository } from "@fastify-e-commerce/db";
import { describe, it, beforeEach, expect } from "vitest";
import { UserSignInUseCase } from "./user-sign-in";
import {
  FakeHashHelper,
  InvalidCredentialsError,
  type userSchemaType,
  type HashHelper,
} from "@fastify-e-commerce/schemas";
import { faker } from "@faker-js/faker";

let sut: UserSignInUseCase;
let userRepo: InMemoryUserRepository;
let hashHelper: HashHelper;

const uuid = uuidv7();
const user: userSchemaType = {
  user_id: uuid,
  email: "johndoe@example.com",
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName(),
  password: "123456-hashed",
  user_type: "USER",
};

describe("User sign-in use case unit test", () => {
  beforeEach(() => {
    userRepo = new InMemoryUserRepository();
    hashHelper = new FakeHashHelper();
    sut = new UserSignInUseCase(userRepo, hashHelper);
    userRepo.users.set(uuid, user);
  });

  it("should be able to sign-in as a existing user", async () => {
    const response = await sut.execute({
      email: "johndoe@example.com",
      password: "123456",
    });
    if (response.isLeft()) {
      expect.fail("return result must be right");
    }
    expect(response.isRight()).toBe(true);
    expect(userRepo.users.get(response.value.user_id)?.email).toEqual(
      "johndoe@example.com",
    );
    expect(response.value.password).toEqual("123456-hashed");
  });

  it("should not be able to sign-in without a valid user", async () => {
    const response = await sut.execute({
      email: "nonexisting@example.com",
      password: "123456",
    });
    expect(response.isLeft()).toBe(true);
    expect(response.value).toBeInstanceOf(InvalidCredentialsError);
  });
});
