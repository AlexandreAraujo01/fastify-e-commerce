import type {
	userSchemaType,
	findUserSchemaType,
	createUserSchemaType,
} from "@/interfaces/zod-user-schema";

export abstract class UserRepositorySchema {
	abstract find(data: findUserSchemaType): Promise<userSchemaType | null>;

	abstract create(data: createUserSchemaType): Promise<userSchemaType | Error>;
}
