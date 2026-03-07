import Fastify from "fastify";
import { healthCheckRoute } from "./http/routes/health-route";
import type { AppError } from "@fastify-e-commerce/schemas";
const fastify = Fastify({
	logger: true,
});

fastify.register(healthCheckRoute);

fastify.setErrorHandler((error: AppError, _, reply) => {
	if (error) {
		return reply.status(error.statusCode).send({ message: error.message });
	}
	// Erro padrão para o resto
	reply.status(500).send({ message: "Internal Server Error" });
});

const start = async () => {
	try {
		await fastify.listen({ port: 3001 });
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
};
start();
