import 'reflect-metadata';
import { initializeDefaultJaegerTracing } from 'backk';
import microservice from './microservice';

initializeDefaultJaegerTracing();

async function startMicroservice() {
  await microservice.initialize(process.argv);
  await microservice.startHttpServer();
}

// noinspection JSIgnoredPromiseFromCall
startMicroservice();
