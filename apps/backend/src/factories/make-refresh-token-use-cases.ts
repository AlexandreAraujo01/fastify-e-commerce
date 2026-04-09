import { prismaInstance, PrismaRefreshTokenRepository } from "@fastify-e-commerce/db";
import { CreateRefreshTokenUseCase } from "../use-cases/users/create-refresh-token-use-case";
import { VerifyAndRevokeRefreshTokenUseCase } from "../use-cases/users/verify-and-revoke-refresh-token-use-case";
import { RevokeRefreshTokenUseCase } from "../use-cases/users/revoke-refresh-token-use-case";

export function makeCreateRefreshTokenUseCase(): CreateRefreshTokenUseCase {
  const repo = new PrismaRefreshTokenRepository(prismaInstance);
  return new CreateRefreshTokenUseCase(repo);
}

export function makeVerifyAndRevokeRefreshTokenUseCase(): VerifyAndRevokeRefreshTokenUseCase {
  const repo = new PrismaRefreshTokenRepository(prismaInstance);
  return new VerifyAndRevokeRefreshTokenUseCase(repo);
}

export function makeRevokeRefreshTokenUseCase(): RevokeRefreshTokenUseCase {
  const repo = new PrismaRefreshTokenRepository(prismaInstance);
  return new RevokeRefreshTokenUseCase(repo);
}
