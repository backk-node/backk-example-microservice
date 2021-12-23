# syntax=docker/dockerfile:1

FROM node:12.19 as builder
WORKDIR /microservice
COPY tsconfig*.json ./
COPY package*.json ./
COPY resources ./resources
COPY src ./src
RUN npm ci
RUN npm run build

FROM node:12.19 as intermediate
WORKDIR /microservice
COPY --from=builder /microservice ./
RUN npm ci --only=production
CMD [ "node", "build/main" ]

FROM gcr.io/distroless/nodejs:12 as final-distroless
WORKDIR /microservice
USER nonroot:nonroot
COPY --from=production --chown=nonroot:nonroot /microservice ./
CMD ["build/main"]
