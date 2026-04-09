import type { FastifyReply, FastifyRequest } from "fastify";
import { makeVerifyAndRevokeRefreshTokenUseCase, makeCreateRefreshTokenUseCase } from "../../factories/make-refresh-token-use-cases";

const isProduction = process.env.NODE_ENV?.toLowerCase() === "production";

export async function RefreshTokenUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    await request.jwtVerify({ onlyCookie: true });

    const currentRefreshToken = request.cookies.refreshToken;
    if (!currentRefreshToken) {
      throw new Error("Missing token");
    }

    const verifyAndRevokeUseCase = makeVerifyAndRevokeRefreshTokenUseCase();
    const result = await verifyAndRevokeUseCase.execute(currentRefreshToken);

    if (result.isLeft()) {
      return reply
        .status(401)
        .clearCookie("refreshToken", { path: "/" })
        .send({ message: result.value.message || "Sessão expirada. Faça login novamente." });
    }

    const { sub, email } = request.user as { sub: string; email: string };

    // Gera um NOVO Access Token (10 minutos)
    const accessToken = await reply.jwtSign(
      { sub, email },
      { sign: { expiresIn: "10m" } },
    );

    //  Gera um NOVO Refresh Token (5 dias) - Estratégia de Rotação
    const refreshToken = await reply.jwtSign(
      { sub, email },
      { sign: { expiresIn: "5d" } },
    );

    const createRefreshTokenUseCase = makeCreateRefreshTokenUseCase();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 5);

    await createRefreshTokenUseCase.execute({
      token: refreshToken,
      user_id: sub,
      expires_at: expiresAt,
    });

    // 4. Atualiza o Cookie e envia o novo Access Token
    return reply
      .setCookie("refreshToken", refreshToken, {
        path: "/",
        secure: isProduction,
        sameSite: "strict",
        httpOnly: true,
      })
      .status(200)
      .send({
        token: accessToken,
      });
  } catch (_err: unknown) {
    return reply
      .status(401)
      .send({ message: "Sessão expirada. Faça login novamente." });
  }
}
