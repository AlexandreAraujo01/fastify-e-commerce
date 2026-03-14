import { InMemoryUserRepository } from "@fastify-e-commerce/db";
import { describe, it, beforeEach, expect } from "vitest";
import {
	UserNotFoundError,
	type createUserSchemaType,
} from "@fastify-e-commerce/schemas";
import { faker } from "@faker-js/faker";
import { FindUserUseCase } from "./find-user-use-case";
let sut: FindUserUseCase;
let userRepo: InMemoryUserRepository;
describe("find user use case unit test", () => {
	beforeEach(() => {
		userRepo = new InMemoryUserRepository();
		sut = new FindUserUseCase(userRepo);
	});

	it("should be able to find a user", async () => {
		const user: createUserSchemaType = {
			email: "johndoe@example.com",
			first_name: faker.person.firstName(),
			last_name: faker.person.lastName(),
			password: faker.internet.password(),
		};
		//colocando o usuario ja dentro do mock
		userRepo.users.set("1", { user_id: "1", ...user });

		const response = await sut.execute({ email: user.email });

		if (response.isLeft()) {
			expect.fail("the result must be right, but return left");
		}
		expect(response.isRight()).toBe(true);
		expect(response.value.email).toEqual(user.email);
	});

	it("should be able to return error when cant find user", async () => {
		const response = await sut.execute({ email: "fakeemail@example.com" });
		if (response.isRight()) {
			expect.fail("the result must be left, but return right");
		}

		expect(response.isLeft()).toBe(true);
		expect(response.value).toBeInstanceOf(UserNotFoundError);
	});
});
