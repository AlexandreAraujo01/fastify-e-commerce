import type { FastifyReply, FastifyRequest } from "fastify";
import type { userLoginSchema } from "@fastify-e-commerce/schemas";
import { makeSignInUserUseCase } from "../../factories/make-sign-in-user-use-case";
import { makeCreateRefreshTokenUseCase } from "../../factories/make-refresh-token-use-cases";

const isProduction = process.env.NODE_ENV?.toLowerCase() === "production";

export async function SignInUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const useCase = makeSignInUserUseCase();
  const result = await useCase.execute(request.body as userLoginSchema);

  if (result.isLeft()) {
    const error = result.value;
    return reply.status(401).send({ message: error.message });
  }

  // Gerando o Access Token (Curta duração: 10 minutos)
  const accessToken = await reply.jwtSign(
    {
      sub: result.value.user_id,
      email: result.value.email,
    },
    {
      sign: { expiresIn: "10m" },
    },
  );

  const refreshToken = await reply.jwtSign(
    {
      sub: result.value.user_id,
      email: result.value.email,
    },
    {
      sign: { expiresIn: "5d" },
    },
  );

  // Store refresh token in database
  const createRefreshTokenUseCase = makeCreateRefreshTokenUseCase();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 5);

  await createRefreshTokenUseCase.execute({
    token: refreshToken,
    user_id: result.value.user_id,
    expires_at: expiresAt,
  });

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
}

