import { AllowForEveryUser, PromiseErrorOr, ReadinessCheckService } from 'backk';

export default class ReadinessCheckServiceImpl extends ReadinessCheckService {
  constructor() {
    super({});
  }

  @AllowForEveryUser()
  isMicroserviceReady(): PromiseErrorOr<null> {
    return Promise.resolve([null, null]);
  }
}
