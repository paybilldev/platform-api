import Fastify, {FastifyInstance} from 'fastify';
import cors from '@fastify/cors';
import platformRoutes from './routes/platform.js';
import {registerOpenAPI} from './openapi/plugin.js';

export async function buildApp(): Promise<FastifyInstance> {
  const server = Fastify({
    logger: {
      level: process.env.LOG_LEVEL ?? 'info',
    },
  });

  await registerOpenAPI(server, {
    title: 'Platform API',
    version: '1.0.0',
    description: 'This is API for the Platform.',
  });

  await server.register(cors, {
    origin: true,
    credentials: true,
  });

  await server.register(
    async instance => {
      await instance.register(platformRoutes);
    },
    {prefix: '/platform'},
  );

  return server;
}
