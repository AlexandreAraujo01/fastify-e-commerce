import {
  zodCreateUserSchema,
  zodUserSchema,
} from "@fastify-e-commerce/schemas";
import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { createUserController } from "../../controllers/create-user-controller";

export async function createUserRoute(fastify: FastifyInstance) {
  const app = fastify.withTypeProvider<ZodTypeProvider>();

  // Rotas Públicas aqui
  app.post(
    "/create",
    {
      schema: {
        description: "Cria um usuario",
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

  // Bloco de Rotas Protegidas
  app.register(async (protectedContext) => {
    protectedContext.addHook("onRequest", fastify.authenticate);

    protectedContext.get("/test", async () => "teste");
  });
}
