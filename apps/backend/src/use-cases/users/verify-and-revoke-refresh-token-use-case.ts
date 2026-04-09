import { RefreshTokenRepositorySchema, Either, left, right } from "@fastify-e-commerce/schemas";

export class RefreshTokenSuspiciousActivityError extends Error {
  constructor() {
    super("Suspicious activity detected. All sessions revoked.");
    this.name = "RefreshTokenSuspiciousActivityError";
  }
}

export class RefreshTokenInvalidError extends Error {
  constructor() {
    super("Invalid or expired refresh token.");
    this.name = "RefreshTokenInvalidError";
  }
}

export class VerifyAndRevokeRefreshTokenUseCase {
  constructor(private refreshTokenRepository: RefreshTokenRepositorySchema) {}

  async execute(
    oldToken: string,
  ): Promise<Either<RefreshTokenInvalidError | RefreshTokenSuspiciousActivityError, void>> {
    const dbToken = await this.refreshTokenRepository.findByToken(oldToken);
    
    if (!dbToken) {
      return left(new RefreshTokenInvalidError());
    }

    if (dbToken.revoked) {
      // Security measure: if a revoked token is used, someone might be stealing it. Revoke all user tokens.
      await this.refreshTokenRepository.revokeAllForUser(dbToken.user_id);
      return left(new RefreshTokenSuspiciousActivityError());
    }

    if (new Date() > dbToken.expires_at) {
      return left(new RefreshTokenInvalidError());
    }

    await this.refreshTokenRepository.revoke(dbToken.id);
    return right(undefined);
  }
}
