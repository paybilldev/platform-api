import {marshall, unmarshall} from '@aws-sdk/util-dynamodb';

import {DynamoDBClient, QueryCommand} from '@aws-sdk/client-dynamodb';

export class TierDetailsProvider {
  async fetchTierDetails(tier: string) {
    const client = new DynamoDBClient({region: process.env.DYNAMO_DB_REGION});
    const params = {
      TableName: process.env.TIER_DETAILS_TABLE,
      KeyConditionExpression: 'tier = :tier',
      ExpressionAttributeValues: marshall({
        ':tier': tier,
      }),
    };

    try {
      const command = new QueryCommand(params);
      const response = await client.send(command);
      if (!response.Items) {
        throw Error('Items not found.');
      }
      const items = response.Items.map((item: any) => unmarshall(item));
      console.log('Query results:', items);

      if (items.length === 0) {
        throw new Error(
          'Provided tier details not found in tier mapping table.',
        );
      }

      // Extract tier details from the fetched items
      const tierDetails = items[0];
      return {...tierDetails, jobIdentifier: tierDetails.jobName};
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
}
