import {
	left,
	right,
	UserNotFoundError,
	type Either,
	type findUserSchemaType,
	type UserRepositorySchema,
	type userSchemaType,
} from "@fastify-e-commerce/schemas";

export class FindUserUseCase {
	constructor(private userRepository: UserRepositorySchema) {}

	async execute(
		data: findUserSchemaType,
	): Promise<Either<UserNotFoundError, userSchemaType>> {
		const user = await this.userRepository.find(data);
		if (!user) {
			return left(new UserNotFoundError());
		}

		return right(user);
	}
}
