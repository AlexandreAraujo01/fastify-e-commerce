import Fastify from "fastify";
import { healthCheckRoute } from "./http/routes/health-route";
import { createUserRoute } from "./http/routes/user-route";
import type { AppError } from "@fastify-e-commerce/schemas";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";

const fastify = Fastify({
  logger: true,
});

fastify.setValidatorCompiler(validatorCompiler);
fastify.setSerializerCompiler(serializerCompiler);
fastify.register(healthCheckRoute);
fastify.register(createUserRoute);

fastify.setErrorHandler((error: {validation: unknown, statusCode: number, message: string}, _, reply) => {
  if (error.validation) {
    return reply.status(400).send({
      message: "Dados inválidos",
      errors: error.validation,
    });
  }


  const statusCode = error.statusCode || 500;
  const message = statusCode >= 500 ? "Internal Server Error" : error.message;

  return reply.status(statusCode).send({ message });
});

const start = async () => {
  try {
    await fastify.listen({ port: 3001 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
