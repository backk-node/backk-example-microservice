import { HttpServer, initializeDefaultJaegerTracing } from 'backk';
import 'reflect-metadata';
import microservice from './microservice';

initializeDefaultJaegerTracing();
microservice.initialize(process.argv, [new HttpServer()]);
