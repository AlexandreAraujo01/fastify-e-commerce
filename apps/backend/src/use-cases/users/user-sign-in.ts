import {
  type Either,
  type HashHelper,
  InvalidCredentialsError,
  left,
  right,
  type userLoginSchema,
  type UserRepositorySchema,
  type userSchemaType,
} from "@fastify-e-commerce/schemas";

export class UserSignInUseCase {
  constructor(
    private userRepository: UserRepositorySchema,
    private hashHelper: HashHelper,
  ) {}

  async execute(
    data: userLoginSchema,
  ): Promise<Either<InvalidCredentialsError, userSchemaType>> {
    const userDatabase = await this.userRepository.find({ email: data.email });
    if (!userDatabase) {
      return left(new InvalidCredentialsError());
    }

    const isPasswordCorrect = await this.hashHelper.compare(
      userDatabase.password,
      data.password,
    );
    if (!isPasswordCorrect) {
      return left(new InvalidCredentialsError());
    }

    return right(userDatabase);
  }
}
