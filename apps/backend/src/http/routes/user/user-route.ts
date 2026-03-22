import {
  zodCreateUserSchema,
  zodUserSchema,
} from "@fastify-e-commerce/schemas";
import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { createUserController } from "../../controllers/create-user-controller";

export async function createUserRoute(fastify: FastifyInstance) {
  const app = fastify.withTypeProvider<ZodTypeProvider>();

  app.post(
    "/user/create",
    {
      schema: {
        body: zodCreateUserSchema,
        response: {
          201: zodUserSchema,
        },
      },
    },
    async (request, reply) => {
      return createUserController(request, reply);
    },
  );
}
