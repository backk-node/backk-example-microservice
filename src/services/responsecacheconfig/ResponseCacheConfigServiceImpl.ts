import { ResponseCacheConfigService } from 'backk';

export default class ResponseCacheConfigServiceImpl extends ResponseCacheConfigService {
  getCachingDurationInSecs(): number {
    return 60;
  }

  shouldCacheServiceFunctionCallResponse(serviceFunctionName: string, serviceFunctionArgument: any): boolean {
    return (
      serviceFunctionName === 'salesItemsService.getSalesItems' &&
      serviceFunctionArgument.pageNumber <= 3 &&
      serviceFunctionArgument.pageSize === 50
    );
  }
}
