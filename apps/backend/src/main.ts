import Fastify from "fastify";
import cookie from "@fastify/cookie";
import {
  serializerCompiler,
  validatorCompiler,
  jsonSchemaTransform,
} from "fastify-type-provider-zod";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { authPlugin } from "./http/plugins/auth";

const fastify = Fastify({ logger: true });

async function bootstrap() {
  await fastify.register(cookie, {
    secret: process.env.COOKIE_SECRET || "development-secret-key-123",
  });


  fastify.setValidatorCompiler(validatorCompiler);
  fastify.setSerializerCompiler(serializerCompiler);


  await fastify.register(authPlugin);


  await fastify.register(fastifySwagger, {
    openapi: { info: { title: "Fastify e-comerce backend", version: "1.0.0" } },
    transform: jsonSchemaTransform,
  });

  await fastify.register(fastifySwaggerUi, {
    routePrefix: "/docs",
    uiConfig: { persistAuthorization: true },
  });

  
  const { healthCheckRoute } = await import("./http/routes/health-route");
  const { createUserRoute } = await import("./http/routes/user/user-route");
  const { authUserRoute } = await import("./http/routes/user/auth-route");

  fastify.register(healthCheckRoute);
  fastify.register(createUserRoute, { prefix: "/user" });
  fastify.register(authUserRoute, { prefix: "/auth" });

  // 6. ERROR HANDLER
  fastify.setErrorHandler((error: any, _, reply) => {

    reply.status(error.statusCode || 500).send({ message: error.message });
  });

  try {
    await fastify.listen({ port: 3001, host: "0.0.0.0" });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

bootstrap();
