import type { FastifyReply, FastifyRequest } from "fastify";
const isProduction = process.env.NODE_ENV?.toLowerCase() === "production";
export async function RefreshTokenUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    await request.jwtVerify({ onlyCookie: true });

    const { sub, email } = request.user as { sub: string; email: string };

    // Gera um NOVO Access Token (10 minutos)
    const accessToken = await reply.jwtSign(
      { sub, email },
      { sign: { expiresIn: "10m" } },
    );

    //  Gera um NOVO Refresh Token (5 dias) - Estratégia de Rotação (mais seguro)
    const refreshToken = await reply.jwtSign(
      { sub, email },
      { sign: { expiresIn: "5d" } },
    );

    // 4. Atualiza o Cookie e envia o novo Access Token
    return reply
      .setCookie("refreshToken", refreshToken, {
        path: "/",
        secure: isProduction,
        sameSite: "strict",
        httpOnly: process.env.NODE_ENV !== "DEV",
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
