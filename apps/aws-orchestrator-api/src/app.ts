import Fastify, {FastifyInstance} from 'fastify';
import cors from '@fastify/cors';
import orchestratorRoutes from './routes/orchestrator.js';
import {registerOpenAPI} from './openapi/plugin.js';

export async function buildApp(): Promise<FastifyInstance> {
  const server = Fastify({
    logger: {
      level: process.env.LOG_LEVEL ?? 'info',
    },
  });

  await registerOpenAPI(server, {
    title: 'Orchestrator API',
    version: '1.0.0',
    description: 'This is API for the Orchestrator.',
  });

  await server.register(cors, {
    origin: true,
    credentials: true,
  });

  await server.register(
    async instance => {
      await instance.register(orchestratorRoutes);
    },
    {prefix: '/orchestrator'},
  );

  return server;
}
