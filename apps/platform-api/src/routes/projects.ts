import type { FastifyPluginAsync } from 'fastify'
import {
  CreateProjectBody,
  CreateProjectResponse,
  ProjectDetailResponse,
  ProjectRefResponse,
  ProjectResourceWarningsResponse,
  RemoveProjectResponse,
  UpdateProjectBody,
  OrganizationProjectsResponse,
  StorageConfigResponse,
  UpdateStorageConfigBody,
} from '../openapi/index.js'

interface ProjectsQuery {
  /** @description Number of projects to return per page */
  limit?: number
  /** @description Number of projects to skip */
  offset?: number
  /** @description Search projects by name */
  search?: string
  /** @description Sort order for projects */
  sort?: 'name_asc' | 'name_desc' | 'created_asc' | 'created_desc'
}

async function getProject(ref: string): Promise<ProjectDetailResponse> {
  return {} as ProjectDetailResponse
}

async function deleteProject(ref: string): Promise<RemoveProjectResponse> {
  return {} as RemoveProjectResponse
}

async function updateProject(ref: string, body: UpdateProjectBody): Promise<ProjectRefResponse> {
  return {} as ProjectRefResponse
}

async function getProjectsResourceWarnings(
  ref?: string,
  slug?: string
): Promise<ProjectResourceWarningsResponse> {
  // fetch warnings from database or API
  return [] as ProjectResourceWarningsResponse
}
async function createProject(body: CreateProjectBody): Promise<CreateProjectResponse> {
  // create project and return response
  return {} as CreateProjectResponse
}
async function getProjects(): Promise<OrganizationProjectsResponse> {
  // fetch projects from database or API
  return {} as OrganizationProjectsResponse
}

async function updateStorageConfig(ref: string, body: UpdateStorageConfigBody): Promise<StorageConfigResponse> {
  return {} as StorageConfigResponse
}

async function getStorageConfig(ref: string): Promise<StorageConfigResponse> {
  return {} as StorageConfigResponse
}

const projectRoutes: FastifyPluginAsync = async (app) => {
  app.get<{
    Querystring: ProjectsQuery
  }>(
    '/',
    {
      schema: {
        description:
          'Gets all projects that belong to the authenticated user. Only returns the minimal project info.',
        tags: ['Projects'],
        operationId: 'ProjectsController_getProjects',
        response: {
          200: {
            $ref: 'OrganizationProjectsResponse',
          },
        },
      },
    },
    async (request, reply) => {
      const projects = await getProjects() // implement this
      return reply.send(projects)
    }
  )

  app.post<{ Body: CreateProjectBody }>(
    '/',
    {
      schema: {
        description: 'Creates a project',
        tags: ['Projects'],
        operationId: 'ProjectsController_createProject',
        body: { $ref: 'CreateProjectBody' },
        response: {
          201: { $ref: 'CreateProjectResponse' },
        },
      },
    },
    async (request, reply) => {
      const project = await createProject(request.body) // implement this
      return reply.status(201).send(project)
    }
  )

  app.get<{
    Querystring: {
      /** @description Project ref */
      ref?: string
      /** @description Organization slug */
      slug?: string
    }
  }>(
    '/projects-resource-warnings',
    {
      schema: {
        description:
          'Gets resource warnings for all projects accessible by the user. Only returns the minimal project info.',
        tags: ['Projects'],
        operationId: 'ProjectsResourceWarningsController_getProjectsResourceWarnings',
        querystring: {
          type: 'object',
          properties: {
            ref: {
              type: 'string',
              description: 'Project ref',
            },
            slug: {
              type: 'string',
              description: 'Organization slug',
            },
          },
        },
        response: {
          200: {
            $ref: 'ProjectResourceWarningsResponse',
          },
        },
      },
    },
    async (request, reply) => {
      const { ref, slug } = request.query
      const warnings = await getProjectsResourceWarnings(ref, slug) // implement this
      return reply.send(warnings)
    }
  )

  app.get<{ Params: { ref: string } }>(
    '/:ref',
    {
      schema: {
        description: 'Gets a specific project that belongs to the authenticated user',
        tags: ['Projects'],
        operationId: 'ProjectsRefController_getProject',
        params: {
          type: 'object',
          properties: {
            ref: {
              type: 'string',
              description: 'Project ref',
            },
          },
          required: ['ref'],
        },
        response: {
          200: { $ref: 'ProjectDetailResponse' },
          401: { description: 'Unauthorized', type: 'null' },
          403: { description: 'Forbidden', type: 'null' },
          429: { description: 'Rate limit exceeded', type: 'null' },
        },
      },
    },
    async (request, reply) => {
      const project = await getProject(request.params.ref)
      return reply.send(project)
    }
  )

  // DELETE /:ref
  app.delete<{ Params: { ref: string } }>(
    '/:ref',
    {
      schema: {
        description: 'Deletes the given project',
        tags: ['Projects'],
        operationId: 'ProjectsRefController_deleteProject',
        params: {
          type: 'object',
          properties: {
            ref: {
              type: 'string',
              description: 'Project ref',
            },
          },
          required: ['ref'],
        },
        response: {
          200: { $ref: 'RemoveProjectResponse' },
          401: { description: 'Unauthorized', type: 'null' },
          403: { description: 'Forbidden', type: 'null' },
          429: { description: 'Rate limit exceeded', type: 'null' },
        },
      },
    },
    async (request, reply) => {
      const removed = await deleteProject(request.params.ref) // implement
      return reply.send(removed)
    }
  )

  // PATCH /:ref
  app.patch<{ Params: { ref: string }; Body: UpdateProjectBody }>(
    '/:ref',
    {
      schema: {
        description: 'Updates the given project',
        tags: ['Projects'],
        operationId: 'ProjectsRefController_updateProject',
        params: {
          type: 'object',
          properties: {
            ref: {
              type: 'string',
              description: 'Project ref',
            },
          },
          required: ['ref'],
        },
        body: { $ref: 'UpdateProjectBody' },
        response: {
          200: { $ref: 'ProjectRefResponse' },
          401: { description: 'Unauthorized', type: 'null' },
          403: { description: 'Forbidden', type: 'null' },
          429: { description: 'Rate limit exceeded', type: 'null' },
          500: { description: 'Failed to update project', type: 'null' },
        },
      },
    },
    async (request, reply) => {
      const updated = await updateProject(request.params.ref, request.body) // implement
      return reply.send(updated)
    }
  )

  app.get<{ Params: { ref: string } }>(
    '/:ref/config/storage',
    {
      schema: {
        description: 'Gets project\'s storage config',
        tags: ['Projects'],
        operationId: 'StorageConfigController_getConfig',
        params: {
          type: 'object',
          properties: {
            ref: {
              type: 'string',
              description: 'Project ref',
            },
          },
          required: ['ref'],
        },
        response: {
          200: { $ref: 'StorageConfigResponse' },
          401: { description: 'Unauthorized', type: 'null' },
          403: { description: 'Forbidden', type: 'null' },
          429: { description: 'Failed to retrieve project\'s storage config', type: 'null' },
        },
      },
    },
    async (request, reply) => {
      const project = await getStorageConfig(request.params.ref)
      return reply.send(project)
    }
  )

  app.patch<{ Params: { ref: string }; Body: UpdateStorageConfigBody }>(
    '/:ref/config/storage',
    {
      schema: {
        description: 'Updates project\'s storage config',
        tags: ['Projects'],
        operationId: 'StorageConfigController_updateConfig',
        params: {
          type: 'object',
          properties: {
            ref: {
              type: 'string',
              description: 'Project ref',
            },
          },
          required: ['ref'],
        },
        body: { $ref: 'StorageConfigResponse' },
        response: {
          200: { $ref: 'ProjectRefResponse' },
          401: { description: 'Unauthorized', type: 'null' },
          403: { description: 'Forbidden', type: 'null' },
          429: { description: 'Rate limit exceeded', type: 'null' },
          500: { description: 'Failed to update project\'s storage config', type: 'null' },
        },
      },
    },
    async (request, reply) => {
      const updated = await updateStorageConfig(request.params.ref, request.body) // implement
      return reply.send(updated)
    }
  )

}

export default projectRoutes
