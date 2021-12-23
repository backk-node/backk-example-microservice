# wait_for_it https://github.com/vishnubob/wait-for-it
# execute curl localhost:${HTTP_SERVER_PORT}/startupCheckService.isServiceStarted with some timeout until it returns OK
newman run postman/integration-tests-collection.json
