import { beforeEach, describe, expect, it } from "vitest";
import { RevokeRefreshTokenUseCase } from "./revoke-refresh-token-use-case";
import { InMemoryRefreshTokenRepository } from "@fastify-e-commerce/db";

let inMemoryRefreshTokenRepository: InMemoryRefreshTokenRepository;
let sut: RevokeRefreshTokenUseCase;

describe("Revoke Refresh Token Use Case", () => {
  beforeEach(() => {
    inMemoryRefreshTokenRepository = new InMemoryRefreshTokenRepository();
    sut = new RevokeRefreshTokenUseCase(inMemoryRefreshTokenRepository);
  });

  it("should revolve a token successfully", async () => {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 5);

    const token = await inMemoryRefreshTokenRepository.create({
      token: "token-to-revoke",
      user_id: "user-1",
      expires_at: expiresAt,
    });

    await sut.execute("token-to-revoke");

    const checkToken = await inMemoryRefreshTokenRepository.findByToken("token-to-revoke");
    expect(checkToken?.revoked).toBe(true);
  });
});
