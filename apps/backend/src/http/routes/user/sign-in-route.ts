import { zodUserLogin, zodUserSignInToken } from "@fastify-e-commerce/schemas";
import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { SignInUserController } from "../../controllers/sign-in-user-controller";

export async function signInUserRoute(fastify: FastifyInstance) {
  const app = fastify.withTypeProvider<ZodTypeProvider>();

  app.post(
    "/sign-in",
    {
      schema: {
        body: zodUserLogin,
        response: {
          200: zodUserSignInToken,
        },
      },
    },
    async (request, reply) => {
      return SignInUserController(request, reply);
    },
  );
}
