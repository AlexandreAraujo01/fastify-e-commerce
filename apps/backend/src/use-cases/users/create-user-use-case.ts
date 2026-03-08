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
	): Promise<Either<Error, userSchemaType>> {
		const { password, email, ...ndata } = data;
		const userAlreadyExists = await this.userRepository.find({ email });
		if (userAlreadyExists) {
			return left(new UserAlreadyExistsError());
		}
		const hashedPassword = await this.hashHelper.hash(password);
		const createdUser = await this.userRepository.create({
			...ndata,
			email,
			password: hashedPassword,
		});
		if (createdUser instanceof Error) {
			return left(createdUser);
		}
		return right(createdUser);
	}
}
