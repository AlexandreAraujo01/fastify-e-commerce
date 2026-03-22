import Fastify from "fastify";
import { healthCheckRoute } from "./http/routes/health-route";
import { createUserRoute } from "./http/routes/user/user-route";
import { signInUserRoute } from "./http/routes/user/sign-in-route";
import {
  serializerCompiler,
  validatorCompiler,
  jsonSchemaTransform,
} from "fastify-type-provider-zod";

import { fastifySwagger } from "@fastify/swagger";
import { fastifyAutoload } from "@fastify/autoload";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { fastifyJwt } from "@fastify/jwt";
import path from "node:path";
const fastify = Fastify({
  logger: true,
});
fastify.setValidatorCompiler(validatorCompiler);
fastify.setSerializerCompiler(serializerCompiler);

fastify.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Fastify e-comerce backend",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
});

fastify.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});

fastify.register(fastifyAutoload, {
  dir: path.join(__dirname, "http/routes"),
});
fastify.register(fastifyJwt, {
  secret: process.env.JWT_SECRET as string,
});
fastify.register(healthCheckRoute);
fastify.register(createUserRoute);
fastify.register(signInUserRoute);
fastify.setErrorHandler(
  (
    error: { validation: unknown; statusCode: number; message: string },
    _,
    reply,
  ) => {
    if (error.validation) {
      return reply.status(400).send({
        message: "Dados inválidos",
        errors: error.validation,
      });
    }

    const statusCode = error.statusCode || 500;
    const message = statusCode >= 500 ? "Internal Server Error" : error.message;

    return reply.status(statusCode).send({ message });
  },
);

const start = async () => {
  try {
    await fastify.listen({ port: 3001 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
