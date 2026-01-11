import {AWSEventBridgeBody} from '../openapi/index.js';

export class TenantProvisioningFailureHandlerProvider {
  constructor() {}
  async handler(body: AWSEventBridgeBody): Promise<void> {
    throw Error(
      `${TenantProvisioningFailureHandlerProvider.name} is not implemented. Follow the README for more details.`,
    );
  }
}
