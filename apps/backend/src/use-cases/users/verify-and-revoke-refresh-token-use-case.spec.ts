import { beforeEach, describe, expect, it } from "vitest";
import { 
  VerifyAndRevokeRefreshTokenUseCase, 
  RefreshTokenInvalidError, 
  RefreshTokenSuspiciousActivityError 
} from "./verify-and-revoke-refresh-token-use-case";
import { InMemoryRefreshTokenRepository } from "@fastify-e-commerce/db";

let inMemoryRefreshTokenRepository: InMemoryRefreshTokenRepository;
let sut: VerifyAndRevokeRefreshTokenUseCase;

describe("Verify and Revoke Refresh Token Use Case", () => {
  beforeEach(() => {
    inMemoryRefreshTokenRepository = new InMemoryRefreshTokenRepository();
    sut = new VerifyAndRevokeRefreshTokenUseCase(inMemoryRefreshTokenRepository);
  });

  it("should verify successfully and revoke the used token", async () => {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 5);

    const token = await inMemoryRefreshTokenRepository.create({
      token: "valid-token-123",
      user_id: "user-1",
      expires_at: expiresAt,
    });

    const result = await sut.execute("valid-token-123");

    expect(result.isRight()).toBe(true);

    const checkToken = await inMemoryRefreshTokenRepository.findByToken("valid-token-123");
    expect(checkToken?.revoked).toBe(true);
  });

  it("should return left if token does not exist", async () => {
    const result = await sut.execute("non-existent");
    
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(RefreshTokenInvalidError);
  });

  it("should return left and revoke all user tokens if token was already revoked (suspicious activity)", async () => {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 5);

    const token1 = await inMemoryRefreshTokenRepository.create({
      token: "revoked-token-123",
      user_id: "user-1",
      expires_at: expiresAt,
    });

    const token2 = await inMemoryRefreshTokenRepository.create({
      token: "active-token-456",
      user_id: "user-1",
      expires_at: expiresAt,
    });

    // Manually revoke the first token
    await inMemoryRefreshTokenRepository.revoke(token1.id);

    // Try to use the revoked token
    const result = await sut.execute("revoked-token-123");

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(RefreshTokenSuspiciousActivityError);

    // Verify all tokens for this user are now revoked
    const checkToken1 = await inMemoryRefreshTokenRepository.findByToken("revoked-token-123");
    const checkToken2 = await inMemoryRefreshTokenRepository.findByToken("active-token-456");
    
    expect(checkToken1?.revoked).toBe(true);
    expect(checkToken2?.revoked).toBe(true);
  });

  it("should return left if token is expired", async () => {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() - 1); // Passado!

    const token = await inMemoryRefreshTokenRepository.create({
      token: "expired-token",
      user_id: "user-1",
      expires_at: expiresAt,
    });

    const result = await sut.execute("expired-token");

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(RefreshTokenInvalidError);
  });
});
