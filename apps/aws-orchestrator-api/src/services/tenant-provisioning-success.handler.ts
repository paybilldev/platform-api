import {EventBridgeClient, PutEventsCommand} from '@aws-sdk/client-eventbridge';
import {DefaultEventTypes} from '../types.js';
import {AWSEventBridgeBody} from '../openapi/index.js';

export class TenantProvisioningSuccessHandlerProvider {
  constructor() {}

  async handler(body: AWSEventBridgeBody): Promise<void> {
    console.log('Provisioning Success Handler Detail Received:', body.detail);

    const eventBridgeClient = new EventBridgeClient({
      region: process.env.EVENT_BUS_AWS_REGION,
    });

    const eventDetail = {...body.detail};

    const params = {
      Entries: [
        {
          Source: 'saas.tenant.provisioning.success.handler',
          DetailType: DefaultEventTypes.TENANT_DEPLOYMENT,
          Detail: JSON.stringify(eventDetail),
          EventBusName: process.env.EVENT_BUS_NAME || 'default',
          Time: new Date(),
        },
      ],
    };

    try {
      const command = new PutEventsCommand(params);
      const response = await eventBridgeClient.send(command);
      console.log('Tenant Deployment event sent successfully:', response);
    } catch (error) {
      console.error('Failed to send the tenant deployment event:', error);
      throw error;
    }
  }
}
