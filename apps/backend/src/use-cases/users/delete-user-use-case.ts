import {
	type Either,
	type findUserSchemaType,
	left,
	right,
	UserNotFoundError,
	type UserRepositorySchema,
	type userSchemaType,
} from "@fastify-e-commerce/schemas";

export class DeleteUserUseCase {
	constructor(private userRepository: UserRepositorySchema) {}

	async execute(
		data: findUserSchemaType,
	): Promise<Either<Error, userSchemaType>> {
		const userAlreadyExists = await this.userRepository.find(data);
		if (!userAlreadyExists) {
			return left(new UserNotFoundError());
		}
		const response = await this.userRepository.delete({
			id: userAlreadyExists.user_id,
		});

		return right(response);
	}
}
