export type { webhooks as platformWebhooks, $defs as $platformDef } from './types/platform'
export type { webhooks as awsOrchestratorWebhooks, $defs as $awsOrchestratormDef } from './types/aws-orchestrator'
import type {
  paths as platformPaths,
  components as platformComponents,
  operations as platformOperations,
} from './types/platform'
import type {
  paths as awsOrchestratorPaths,
  components as awsOrchestratorComponents,
  operations as awsOrchestratorOperations,
} from './types/aws-orchestrator'

export interface paths extends platformPaths {}
export interface paths extends awsOrchestratorPaths {}

export interface operations extends platformOperations {}
export interface operations extends awsOrchestratorOperations {}

export interface components {
  schemas: platformComponents['schemas'] | awsOrchestratorComponents['schemas']
  responses: platformComponents['responses'] | awsOrchestratorComponents['responses']
  parameters: platformComponents['parameters'] | awsOrchestratorComponents['parameters']
  requestBodies: platformComponents['requestBodies'] | awsOrchestratorComponents['requestBodies']
  headers: platformComponents['headers'] | awsOrchestratorComponents['headers']
  pathItems: platformComponents['pathItems'] | awsOrchestratorComponents['pathItems']
}
