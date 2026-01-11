import {z} from 'zod';
import {zodToJsonSchema} from '../utils/zod-to-json-schema.js';

export const EventTypes = z.enum([
  'TENANT_PROVISIONING',
  'TENANT_DEPROVISIONING',
  'TENANT_PROVISIONING_SUCCESS',
  'TENANT_PROVISIONING_FAILURE',
  'TENANT_DEPLOYMENT',
  'TENANT_DEPLOYMENT_SUCCESS',
  'TENANT_DEPLOYMENT_FAILURE',
]);

export const AWSEventBridgeBodySchema = z.object({
  version: z.string(),
  id: z.string(),
  'detail-type': EventTypes,
  source: z.string(),
  account: z.string(),
  time: z.string(),
  region: z.string(),
  resources: z.array(z.never()),
  // detail can be an object, string, number, array, etc.
  detail: z.union([
    z.record(z.union([z.string(), z.number(), z.any()])), // object with string/number/any values
    z.string(),
    z.number(),
    z.array(z.any()),
    z.any(), // catch-all for anything else
  ]),
});

// TypeScript type inferred from Zod
export type AWSEventBridgeBody = z.infer<typeof AWSEventBridgeBodySchema>;

export const AWSEventBridgeBodyJsonSchema = zodToJsonSchema(
  AWSEventBridgeBodySchema,
  {
    name: 'AWSEventBridgeBody',
  },
);
