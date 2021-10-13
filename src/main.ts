import 'reflect-metadata';
import { initialize, initializeDefaultJaegerTracing, startHttpServerFor } from 'backk';
import { microservice } from './microservice';

initializeDefaultJaegerTracing();

async function startMicroservice() {
  await initialize(microservice, process.argv);
  await startHttpServerFor(microservice);
}
// noinspection JSIgnoredPromiseFromCall
startMicroservice();
