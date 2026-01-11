import {AWSEventBridgeBody} from '../openapi/index.js';
import {DefaultEventTypes, OrchestratorServiceInterface} from '../types.js';
import {TenantDeploymentProvider} from './tenant-deployment.handler.js';
import {TenantDeprovisioningHandlerProvider} from './tenant-deprovisioning-handler.service.js';
import {TenantProvisioningFailureHandlerProvider} from './tenant-provisioning-failure-handler.service.js';
import {TenantProvisioningHandlerProvider} from './tenant-provisioning-handler.service.js';
import {TenantProvisioningSuccessHandlerProvider} from './tenant-provisioning-success.handler.js';

export class OrchestratorService implements OrchestratorServiceInterface {
  handleEvent(
    eventType: DefaultEventTypes,
    eventBody: AWSEventBridgeBody,
  ): Promise<void> {
    switch (eventType) {
      case DefaultEventTypes.TENANT_PROVISIONING:
        return new TenantProvisioningHandlerProvider().handler(eventBody);
      case DefaultEventTypes.TENANT_DEPROVISIONING:
        return new TenantDeprovisioningHandlerProvider().handler(eventBody);
      case DefaultEventTypes.TENANT_PROVISIONING_SUCCESS:
        return new TenantProvisioningSuccessHandlerProvider().handler(
          eventBody,
        );
      case DefaultEventTypes.TENANT_PROVISIONING_FAILURE:
        return new TenantProvisioningFailureHandlerProvider().handler(
          eventBody,
        );
      case DefaultEventTypes.TENANT_DEPLOYMENT:
        return new TenantDeploymentProvider().handler(eventBody);
      default:
        throw new Error(`Unsupported event type: ${eventType}`);
    }
  }
}
