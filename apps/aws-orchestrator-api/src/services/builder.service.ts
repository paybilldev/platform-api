import {BuilderServiceInterface, AnyObject} from '../types.js';

export class BuilderService implements BuilderServiceInterface {
  constructor() {}

  async startJob(jobName: string, params: AnyObject): Promise<void> {
    throw Error(
      `${BuilderService.name} is not implemented. Follow the README for more details.`,
    );
  }
}
