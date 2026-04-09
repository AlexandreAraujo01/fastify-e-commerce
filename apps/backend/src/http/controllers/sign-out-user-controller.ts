import type { FastifyReply, FastifyRequest } from "fastify";
import { makeRevokeRefreshTokenUseCase } from "../../factories/make-refresh-token-use-cases";

export async function SignOutUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const currentRefreshToken = request.cookies.refreshToken;
  if (currentRefreshToken) {
    const revokeUseCase = makeRevokeRefreshTokenUseCase();
    await revokeUseCase.execute(currentRefreshToken);
  }

  return reply.clearCookie("refreshToken", { path: "/" }).status(204).send();
}

