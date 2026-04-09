import {
  RefreshTokenRepositorySchema,
  RefreshTokenSchemaType,
  CreateRefreshTokenSchemaType,
} from "@fastify-e-commerce/schemas";

export class CreateRefreshTokenUseCase {
  constructor(private refreshTokenRepository: RefreshTokenRepositorySchema) {}

  async execute(
    data: CreateRefreshTokenSchemaType,
  ): Promise<RefreshTokenSchemaType> {
    const refreshToken = await this.refreshTokenRepository.create(data);
    return refreshToken;
  }
}
