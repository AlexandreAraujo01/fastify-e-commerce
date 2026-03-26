import { zodUserLogin, zodUserSignInToken } from "@fastify-e-commerce/schemas";
import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { SignInUserController } from "../../controllers/sign-in-user-controller";
import { SignOutUserController } from "@/http/controllers/sign-out-user-controller";
import z from "zod";
import { RefreshTokenUserController } from "@/http/controllers/refresh-token-user-controller";

export async function authUserRoute(fastify: FastifyInstance) {
  const app = fastify.withTypeProvider<ZodTypeProvider>();

  app.post(
    "/sign-in",
    {
      schema: {
        description: "Authentifica um usuário e gera o token",
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

  app.post(
    "/sign-out",
    {
      schema: {
        description: "Encerra a sessão do usuário limpando os cookies",
        response: {
          204: z.null(),
        },
      },
    },
    async (request, reply) => {
      return SignOutUserController(request, reply);
    },
  );

  app.patch(
    "/refresh-token",
    {
      schema: {
        description:
          "Gera um novo access token usando o refresh token do cookie",
        response: {
          200: zodUserSignInToken,
        },
      },
    },
    async (request, reply) => {
      return RefreshTokenUserController(request, reply);
    },
  );
}
