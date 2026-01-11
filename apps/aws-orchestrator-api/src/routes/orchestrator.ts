import type {FastifyPluginAsync} from 'fastify';
import {AWSEventBridgeBody} from '../openapi/index.js';
import {DefaultEventTypes} from '../types.js';
import {OrchestratorService} from '../services/orchestrator.service.js';

async function getInfrastructureStatus(): Promise<void> {
  // Implement your infrastructure status check here
}

const orchestratorRoutes: FastifyPluginAsync = async app => {
  app.post<{Body: AWSEventBridgeBody; Params: {eventType: string}}>(
    '/events/:eventType',
    {
      schema: {
        description: 'Handle orchestrator events',
        tags: ['Orchestrator'],
        operationId: 'OrchestratorController_handleEvent',
        params: {
          type: 'object',
          properties: {
            eventType: {type: 'string'},
          },
          required: ['eventType'],
        },
        body: {
          $ref: 'AWSEventBridgeBody',
        },
        response: {
          201: {type: 'null'},
          500: {type: 'null'},
        },
      },
    },
    async (request, reply) => {
      const eventType = request.params.eventType as DefaultEventTypes;

      const orchestratorService = new OrchestratorService();
      await orchestratorService.handleEvent(eventType, request.body);

      return reply.code(201).send();
    },
  );

  app.get(
    '/status',
    {
      schema: {
        description: 'Get infrastructure status',
        tags: ['Status'],
        operationId: 'StatusController_getStatus',
        response: {
          200: {
            description: 'Infrastructure status retrieved successfully',
            type: 'null', // no body content
          },
          500: {
            description: 'Failed to retrieve infrastructure status',
            type: 'null',
          },
        },
      },
    },
    async (_request, reply) => {
      try {
        await getInfrastructureStatus();
        return reply.status(200).send();
      } catch (err) {
        return reply.status(500).send();
      }
    },
  );  
};

export default orchestratorRoutes;
