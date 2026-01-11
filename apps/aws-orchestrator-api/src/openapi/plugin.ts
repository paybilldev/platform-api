import fastifySwagger, {type SwaggerOptions} from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import type {FastifyInstance} from 'fastify';
import type {JsonSchema} from './utils/zod-to-json-schema.js';
import {AWSEventBridgeBodyJsonSchema} from './schemas/orchestrator.schema.js';

/**
 * Server configuration for OpenAPI spec.
 */
export interface OpenAPIServer {
  url: string;
  description?: string;
}

/**
 * Error response definition for OpenAPI documentation.
 */
export interface ErrorResponseDefinition {
  /** HTTP status code */
  statusCode: number;
  /** Description of when this error occurs */
  description: string;
}

/**
 * Multipart body schema configuration for OpenAPI documentation.
 */
export interface MultipartBodySchema {
  /** Route URL pattern (e.g., '/upload') */
  url: string;
  /** JSON Schema for the multipart body */
  schema: JsonSchema;
  /** Error responses to document (optional) */
  errorResponses?: ErrorResponseDefinition[];
}

/**
 * Options for registering OpenAPI documentation.
 */
export interface OpenAPIOptions {
  /** API title */
  title: string;
  /** API version */
  version: string;
  /** API description */
  description?: string;
  /** List of server URLs */
  servers?: OpenAPIServer[];
  /** Route prefix for documentation endpoints (default: /documentation) */
  routePrefix?: string;
  /** Whether to expose the JSON spec at /documentation/json (default: true) */
  exposeRoute?: boolean;
  /** Additional schemas to register in components.schemas */
  additionalSchemas?: Record<string, JsonSchema>;
  /**
   * Multipart body schemas for documentation.
   * These are injected into the OpenAPI spec for routes that use multipart/form-data.
   * Fastify doesn't validate multipart bodies, so these are for docs only.
   */
  multipartBodies?: MultipartBodySchema[];
}

export async function registerOpenAPI(
  app: FastifyInstance,
  options: OpenAPIOptions,
): Promise<void> {
  const routePrefix = options.routePrefix ?? '/docs';

  // Register additional schemas from the service
  if (options.additionalSchemas) {
    for (const [name, schema] of Object.entries(options.additionalSchemas)) {
      app.addSchema({
        $id: name,
        ...(schema as object),
      });
    }
  }

  // Register shared schemas with Fastify (for both serialization and OpenAPI)
  // These schemas can be referenced via $ref: '#/components/schemas/SchemaName'
  app.addSchema({
    $id: 'AWSEventBridgeBody',
    ...(AWSEventBridgeBodyJsonSchema as object),
  });

  // Register @fastify/swagger for OpenAPI spec generation
  const swaggerOptions: SwaggerOptions = {
    openapi: {
      openapi: '3.0.3',
      info: {
        title: options.title,
        version: options.version,
        description: options.description,
      },
      servers: options.servers,
    },
    // refResolver tells swagger to use the schemas we added via addSchema
    refResolver: {
      buildLocalReference(json, _baseUri, _fragment, _i) {
        // Use the $id as the reference name
        return json.$id as string;
      },
    },
  };
  await app.register(fastifySwagger, swaggerOptions);

  // Register @fastify/swagger-ui for serving Swagger UI
  await app.register(fastifySwaggerUi, {
    routePrefix,
    uiConfig: {
      docExpansion: 'list',
      deepLinking: true,
      defaultModelsExpandDepth: 3,
      defaultModelExpandDepth: 3,
    },
    staticCSP: true,
  });
}
