import { beforeEach, describe, expect, it } from "vitest";
import { CreateRefreshTokenUseCase } from "./create-refresh-token-use-case";
import { InMemoryRefreshTokenRepository } from "@fastify-e-commerce/db";

let inMemoryRefreshTokenRepository: InMemoryRefreshTokenRepository;
let sut: CreateRefreshTokenUseCase;

describe("Create Refresh Token Use Case", () => {
  beforeEach(() => {
    inMemoryRefreshTokenRepository = new InMemoryRefreshTokenRepository();
    sut = new CreateRefreshTokenUseCase(inMemoryRefreshTokenRepository);
  });

  it("should be able to create a refresh token", async () => {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 5);

    const tokenData = {
      token: "example-token-123",
      user_id: "user-1",
      expires_at: expiresAt,
    };

    const token = await sut.execute(tokenData);

    expect(token.id).toEqual(expect.any(String));
    expect(token.token).toBe("example-token-123");
    expect(token.user_id).toBe("user-1");
    expect(token.revoked).toBe(false);
  });
});
