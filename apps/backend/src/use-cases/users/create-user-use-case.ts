import {
	left,
	right,
	type userSchemaType,
	type createUserSchemaType,
	type Either,
	type UserRepositorySchema,
	type HashHelper,
	UserAlreadyExistsError,
} from "@fastify-e-commerce/schemas";
export class CreateUserUseCase {
	constructor(
		private userRepository: UserRepositorySchema,
		private hashHelper: HashHelper,
	) {}
	async execute(
		data: createUserSchemaType,
	): Promise<Either<UserAlreadyExistsError, userSchemaType>> {
		const userAlreadyExists = await this.userRepository.find({
			email: data.email,
		});
		if (userAlreadyExists) {
			return left(new UserAlreadyExistsError());
		}
		const { password, email, ...ndata } = data;
		const hashedPassword = await this.hashHelper.hash(password);
		const createdUser = await this.userRepository.create({
			...ndata,
			email,
			password: hashedPassword,
		});
		return right(createdUser);
	}
}
