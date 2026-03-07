import type { FastifyInstance } from "fastify";

export async function healthCheckRoute(
	fastify: FastifyInstance,
	options: Object,
) {
	fastify.get("/health", async (_, reply) => {
		reply.send({ health: "ok" });
	});
}
