import "fastify";
import "@fastify/jwt";

declare module "fastify" {
  interface FastifyInstance {
    // É aqui que o TS vai procurar quando você fizer fastify.authenticate
    authenticate: (
      request: FastifyRequest,
      reply: FastifyReply,
    ) => Promise<void>;
  }
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    // Isso tipa o 'request.user' que o jwtVerify() preenche
    user: {
      sub: string;
      email: string;
      // Adicione outros campos que seu token tiver
    };
  }
}
