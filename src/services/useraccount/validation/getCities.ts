import { Many, PromiseErrorOr, tryGetValuesByXPathFromXmlFile, Value } from 'backk';
import createBackkErrorFromError from 'backk/lib/errors/createBackkErrorFromError';

let cities: Value[] = [];

export default function getCities(): PromiseErrorOr<Many<Value>> {
  if (cities.length === 0) {
    try {
      cities = tryGetValuesByXPathFromXmlFile(
        'resources/postitoimipaikat.xml',
        '/postitoimipaikat/toimipaikka/nimi/text()'
      ).map((cityNode) => ({ value: cityNode.nodeValue }));
    } catch (error) {
      return Promise.resolve([null, createBackkErrorFromError(error)]);
    }
  }

  return Promise.resolve([{ metadata: { currentPageTokens: undefined }, data: cities }, null]);
}
