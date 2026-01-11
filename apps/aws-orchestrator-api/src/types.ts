export type AnyObject = Record<string, any>;
export type ValueOrPromise<T> = T | PromiseLike<T>;

export interface OrchestratorServiceInterface<
  EventType extends string = DefaultEventTypes,
  BodyType extends AnyObject = AnyObject,
> {
  handleEvent(eventType: EventType, eventBody: BodyType): Promise<void>;
}

export interface BuilderServiceInterface {
  startJob(jobIdentifier: string, params: AnyObject): Promise<void>;
}

export enum DefaultEventTypes {
  TENANT_PROVISIONING = 'TENANT_PROVISIONING',
  TENANT_DEPROVISIONING = 'TENANT_DEPROVISIONING',
  TENANT_PROVISIONING_SUCCESS = 'TENANT_PROVISIONING_SUCCESS',
  TENANT_PROVISIONING_FAILURE = 'TENANT_PROVISIONING_FAILURE',

  TENANT_DEPLOYMENT = 'TENANT_DEPLOYMENT',
  TENANT_DEPLOYMENT_SUCCESS = 'TENANT_DEPLOYMENT_SUCCESS',
  TENANT_DEPLOYMENT_FAILURE = 'TENANT_DEPLOYMENT_FAILURE',
}
