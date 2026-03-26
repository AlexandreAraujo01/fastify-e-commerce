import fp from "fastify-plugin";
import { fastifyJwt } from "@fastify/jwt";
import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export const authPlugin = fp(async (fastify: FastifyInstance) => {
  fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET as string,
    sign: {
      expiresIn: "10m",
    },
    cookie: {
      cookieName: "refreshToken", // O mesmo nome que você usou no .setCookie()
      signed: false, // Deixe false, a menos que tenha configurado segredo no @fastify/cookie
    },
  });

  fastify.decorate(
    "authenticate",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        // Para rotas comuns, ele continua procurando no Header (Bearer)
        await request.jwtVerify();
      } catch (err) {
        reply.send(err);
      }
    },
  );
});
