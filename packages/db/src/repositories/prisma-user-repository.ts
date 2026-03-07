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

	async create(data: createUserSchemaType): Promise<userSchemaType | Error> {
		try {
			return await this.prisma.user.create({
				data: {
					...data,
					user_id: uuidv7(),
				},
			});
		} catch (error) {
			// Verifica se o erro é conhecido do Prisma
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === "P2002") {
					return new UserAlreadyExistsError();
				}
			}

			throw error;
		}
	}
}
