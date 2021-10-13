import { AbstractDataStore, AllowForEveryUser, LivenessCheckService, PromiseErrorOr } from 'backk';

export default class LivenessCheckServiceImpl extends LivenessCheckService {
  constructor(dataStore: AbstractDataStore) {
    super({}, dataStore);
  }

  @AllowForEveryUser()
  isMicroserviceAlive(): PromiseErrorOr<null> {
    return Promise.resolve([null, null]);
  }
}
