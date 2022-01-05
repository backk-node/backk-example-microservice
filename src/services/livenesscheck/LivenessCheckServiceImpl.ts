import { AllowForEveryUser, LivenessCheckService, PromiseErrorOr } from 'backk';

export default class LivenessCheckServiceImpl extends LivenessCheckService {
  constructor() {
    super({});
  }

  @AllowForEveryUser(false)
  isMicroserviceAlive(): PromiseErrorOr<null> {
    return Promise.resolve([null, null]);
  }
}
