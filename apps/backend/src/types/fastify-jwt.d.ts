/** biome-ignore-all lint/suspicious/noExplicitAny: <explanation> */
import "@fastify/jwt";

declare module "fastify" {
  export interface FastifyReply {
    jwtSign(payload: any, options?: any): Promise<string>;
  }
}
