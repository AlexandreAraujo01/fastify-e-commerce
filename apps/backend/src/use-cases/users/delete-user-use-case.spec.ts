import { uuidv7 } from "uuidv7";

import { InMemoryUserRepository } from "@fastify-e-commerce/db";
import { describe, it, beforeEach, expect } from "vitest";
import type { userSchemaType } from "@fastify-e-commerce/schemas";
import { faker } from "@faker-js/faker";
import { DeleteUserUseCase } from "./delete-user-use-case";
let sut: DeleteUserUseCase;
let userRepo: InMemoryUserRepository;

const user_uuid = uuidv7();
const user: userSchemaType = {
	user_id: user_uuid,
	email: "johndoe@example.com",
	first_name: faker.person.firstName(),
	last_name: faker.person.lastName(),
	password: faker.internet.password(),
	user_type: "USER",
};

describe("delete user use case unit test", () => {
	beforeEach(() => {
		userRepo = new InMemoryUserRepository();

		sut = new DeleteUserUseCase(userRepo);
		userRepo.users.set(user_uuid, user);
	});

	it("should be able to delete an existing user", async () => {
		const response = await sut.execute(user);
		if (response.isLeft()) {
			expect.fail("return result must be right");
		}
		expect(response.isRight()).toBe(true);
		expect(userRepo.users.size).toEqual(0);
		expect(response.value?.email).toEqual("johndoe@example.com");
	});

	it("should not be able to delete a non existing user", async () => {
		const response = await sut.execute({ user_id: uuidv7() });
		expect(response.isLeft()).toBe(true);
		expect(userRepo.users.size).toEqual(1);
		expect(response.value).toBeInstanceOf(Error);
	});
});
