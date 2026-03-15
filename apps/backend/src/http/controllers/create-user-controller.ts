import type { FastifyReply, FastifyRequest } from "fastify";
import { makeCreateUserUseCase } from "../../factories/make-register-user-use-case";
import type { createUserSchemaType } from "@fastify-e-commerce/schemas";

export async function createUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const useCase = makeCreateUserUseCase();

  const result = await useCase.execute(request.body as createUserSchemaType);

  if (result.isLeft()) {
    const error = result.value;
    return reply.status(400).send({ message: error.message });
  }

  return reply.status(201).send(result.value);
}
