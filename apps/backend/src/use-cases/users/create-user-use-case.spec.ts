import { InMemoryUserRepository } from "@fastify-e-commerce/db";
import { describe, it, beforeEach, expect } from "vitest";
import { CreateUserUseCase } from "./create-user-use-case";
import {
	FakeHashHelper,
	UserAlreadyExistsError,
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
			password: "123456",
			user_type: "USER",
		};

		const response = await sut.execute(user);
		if (response.isLeft()) {
			expect.fail("return result must be right");
		}
		expect(response.isRight()).toBe(true);
		expect(userRepo.users.size).toEqual(1);
		expect(userRepo.users.get(response.value.user_id)?.email).toEqual(
			"johndoe@example.com",
		);
		expect(response.value.password).toEqual("123456-hashed");
	});

	it("should not be able to create duplicated user", async () => {
		const user: createUserSchemaType = {
			email: "johndoe@example.com",
			first_name: faker.person.firstName(),
			last_name: faker.person.lastName(),
			password: faker.internet.password(),
			user_type: "USER",
		};

		await sut.execute(user);
		const response = await sut.execute(user);
		expect(response.isLeft()).toBe(true);
		expect(userRepo.users.size).toEqual(1);
		expect(response.value).toBeInstanceOf(UserAlreadyExistsError);
	});
});
