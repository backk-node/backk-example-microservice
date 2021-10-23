# syntax=docker/dockerfile:1
# TODO: https://blog.baeke.info/2021/03/28/distroless-or-scratch-for-go-apps/

FROM node:14

RUN groupadd -g 2000 microservice && \
    useradd -u 1000 -g microservice -s /bin/bash microservice-user

WORKDIR /microservice
COPY ["package.json", "package-lock.json", "./"]
RUN npm ci --only=production
RUN npm run build
COPY build build/
USER 1000
CMD [ "node", "build/main" ]

