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
	constructor(private prisma: PrismaClient) { }

	async find(data: findUserSchemaType): Promise<userSchemaType | null> {
		if (data.user_id) {
			return await this.prisma.user.findUnique({
				where: { user_id: data.user_id },
			});
		}
		if (data.email) {
			return await this.prisma.user.findUnique({
				where: { email: data.email },
			});
		}
		return null;
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
