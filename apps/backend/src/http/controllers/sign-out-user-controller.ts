import type { FastifyReply, FastifyRequest } from "fastify";

export async function SignOutUserController(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  return reply.clearCookie("refreshToken", { path: "/" }).status(204).send();
}
