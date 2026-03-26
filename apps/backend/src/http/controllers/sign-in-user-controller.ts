import type { FastifyReply, FastifyRequest } from "fastify";
import type { userLoginSchema } from "@fastify-e-commerce/schemas";
import { makeSignInUserUseCase } from "../../factories/make-sign-in-user-use-case";
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

  // Envia o Refresh Token via Cookie e o Access Token no Body
  // console.log("NODE_ENV atual:", process.env.NODE_ENV);
  // console.log("isProduction:", isProduction);
  return reply
    .setCookie("refreshToken", refreshToken, {
      path: "/",
      secure: isProduction,
      sameSite: "strict",
      httpOnly: isProduction,
    })
    .status(200)
    .send({
      token: accessToken,
    });
}
