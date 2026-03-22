import type { FastifyReply, FastifyRequest } from "fastify";
import type { userLoginSchema } from "@fastify-e-commerce/schemas";
import { makeSignInUserUseCase } from "../../factories/make-sign-in-user-use-case";

export async function SignInUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const useCase = makeSignInUserUseCase();
  const result = await useCase.execute(request.body as userLoginSchema);

  if (result.isLeft()) {
    const error = result.value;
    return reply.status(401).send({ message: error.message }); // 401 é mais adequado para falha de login
  }

  // ADICIONE O AWAIT AQUI
  const jwtToken = await reply.jwtSign({
    sub: result.value.user_id,
    email: result.value.email,
  });

  // Dica: Retorne um objeto, é melhor para o cliente (Frontend) consumir
  return reply.status(200).send({
    token: jwtToken,
  });
}
