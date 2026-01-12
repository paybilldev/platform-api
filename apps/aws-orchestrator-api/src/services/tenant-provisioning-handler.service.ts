import {AWSEventBridgeBody} from '../openapi/index.js';
import { AwsCodeBuildService } from './aws-code-build.service.js';
import {DataStoreService} from './data-store.service.js';
import {TierDetailsProvider} from './tier-details.service.js';

export class TenantProvisioningHandlerProvider {
  async handler(body: AWSEventBridgeBody): Promise<void> {
    // Extract plan and builder information from the body
    console.log('Tenant Provisioning: ', body.detail);
    const planConfig = body.detail.planConfig;
    const builder = body.detail.builderConfig;
    const tier = planConfig.tier;
    const tenant = body.detail.tenant;

    const dataStoreService = new DataStoreService();
    await dataStoreService.storeDataInDynamoDB({
      tenantId: tenant.id,
      ...body,
    });

    try {
      // Fetch tier details based on the provided tier
      const tierDetailsProvider = new TierDetailsProvider();
      const {jobIdentifier, ...otherTierDetails} =
        await tierDetailsProvider.fetchTierDetails(tier);
      const jobName = jobIdentifier;

      // Ensure Job name is present in the tier details
      if (!jobName) {
        throw new Error('Builder Job name not found in plan details');
      }

      // Check if the builder type is CODE_BUILD
      if (builder?.type === 'CODE_BUILD') {
        // Trigger CodeBuild with the necessary environments
        const builderService = new AwsCodeBuildService();
        const codeBuildResponse = await builderService.startJob(jobName, {
          ...otherTierDetails,
          ...(builder?.config?.environmentOverride ?? {}),
        });

        console.log('Code Build Response: ', codeBuildResponse);

        return;
      } else {
        // Throw an error if the builder config is invalid
        throw Error('Invalid builder config provided.');
      }
    } catch (error) {
      console.error('Error in tenant provisioning:', error);
      return;
    }
  }
}
