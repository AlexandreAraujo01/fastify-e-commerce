import { RefreshTokenRepositorySchema } from "@fastify-e-commerce/schemas";

export class RevokeRefreshTokenUseCase {
  constructor(private refreshTokenRepository: RefreshTokenRepositorySchema) {}

  async execute(token: string): Promise<void> {
    const dbToken = await this.refreshTokenRepository.findByToken(token);
    if (dbToken && !dbToken.revoked) {
      await this.refreshTokenRepository.revoke(dbToken.id);
    }
  }
}
