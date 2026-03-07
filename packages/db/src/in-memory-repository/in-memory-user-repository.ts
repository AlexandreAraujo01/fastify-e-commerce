import {
	UserAlreadyExistsError,
	type createUserSchemaType,
	type findUserSchemaType,
	type UserRepositorySchema,
	type userSchemaType,
} from "@fastify-e-commerce/schemas";

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

	async create(data: createUserSchemaType): Promise<userSchemaType | Error> {
		const userAlreadyExists = await this.find({ email: data.email });

		if (userAlreadyExists) {
			throw new UserAlreadyExistsError();
		}

		const newUser: userSchemaType = {
			user_id: `${this.users.size + 1}`,
			...data,
		};

		this.users.set(newUser.user_id, newUser);
		return newUser;
	}

	async clear(): Promise<void> {
		this.users.clear();
	}
}
