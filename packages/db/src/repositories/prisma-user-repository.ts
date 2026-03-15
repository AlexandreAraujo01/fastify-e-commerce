import {
	type createUserSchemaType,
	type findUserSchemaType,
	UserAlreadyExistsError,
	type UserRepositorySchema,
	type userSchemaType,
} from "@fastify-e-commerce/schemas";
import { Prisma, type PrismaClient } from "generated/prisma/client";
import { uuidv7 } from "uuidv7";

export class PrismaUserRepository implements UserRepositorySchema {
	constructor(private prisma: PrismaClient) {}

	async find(data: findUserSchemaType): Promise<userSchemaType | null> {
		return await this.prisma.user.findUnique({
			where: { user_id: data.user_id, email: data.email },
		});
	}

	async create(data: createUserSchemaType): Promise<userSchemaType> {
		return await this.prisma.user.create({
			data: {
				...data,
				user_id: uuidv7(),
			},
		});
	}

	delete(data: { id: string }): Promise<userSchemaType> {
		throw new Error("Method not implemented.");
	}
}
