import {AWSEventBridgeBody} from '../openapi/index.js';

export class TenantDeprovisioningHandlerProvider {
  constructor() {}
  async handler(body: AWSEventBridgeBody): Promise<void> {
    throw Error(
      `${TenantDeprovisioningHandlerProvider.name} is not implemented. Follow the README for more details.`,
    );
  }
}
