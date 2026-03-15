import type {
	createUserSchemaType,
	findUserSchemaType,
	UserRepositorySchema,
	userSchemaType,
} from "@fastify-e-commerce/schemas";
import { uuidv7 } from "uuidv7";

export class InMemoryUserRepository implements UserRepositorySchema {
	public users = new Map<string, userSchemaType>();

	async find(data: findUserSchemaType): Promise<userSchemaType | null> {
		const allUsers = Array.from(this.users.values());

		const user = allUsers.find((u) => {
			if (data.user_id && u.user_id === data.user_id) return true;
			if (data.email && u.email === data.email) return true;
			return false;
		});

		return user || null;
	}

	async create(data: createUserSchemaType): Promise<userSchemaType> {
		const uuid = uuidv7();

		const newUser: userSchemaType = {
			user_id: uuid,
			...data,
		};

		this.users.set(newUser.user_id, newUser);
		return newUser;
	}

	async delete(data: { id: string }): Promise<userSchemaType> {
		const user = this.users.get(data.id) as userSchemaType;
		this.users.delete(data.id);
		return user;
	}
}
