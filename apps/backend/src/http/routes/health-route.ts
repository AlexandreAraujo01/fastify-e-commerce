import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod"; // ou do seu pacote de schemas

export async function healthCheckRoute(fastify: FastifyInstance) {
  // Adicione o .withTypeProvider aqui
  const app = fastify.withTypeProvider<ZodTypeProvider>();

  app.get(
    "/health",
    {
      schema: {
        response: {
          200: z.object({
            health: z.string(),
          }),
        },
      },
    },
    async (_, reply) => {
      // Agora o 'reply.send' é validado pelo Zod em tempo de compilação!
      return reply.send({ health: "ok" });
    },
  );
}
