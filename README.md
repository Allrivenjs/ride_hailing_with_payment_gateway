## Ride hailing

Simple API for a Ride Hailing like app

## Getting started

To run this project, you must clone down this repository. You will also need `node` and `npm` installed globally on your machine.

Setup dockerfile:

`docker compose -f .\docker-compose.yaml up -d --build`

environment variables in docker
````
- POSTGRES_HOST=db
- POSTGRES_PORT=5432
- POSTGRES_USER=user
- POSTGRES_PASSWORD=password
- POSTGRES_DB=ride_hailing
- DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@db:${POSTGRES_PORT}/${POSTGRES_DB}?schema=public"
- WOMPI_PUBLIC_KEY=pub_test_EjcgGnHhlLadwW52vNRlX2iGM31wRYLM
- WOMPI_PRIVATE_KEY=prv_test_cldsXv764CudmClLoxc9OmRGB4R2noq1
- WOMPI_URL=https://sandbox.wompi.co/v1/
- TOKEN_OPENROUTE_SERVICE=5b3ce3597851110001cf6248371183c5d69c41d184c801efce72e411
````

env environment variables

````
DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@db:${POSTGRES_PORT}/${POSTGRES_DB}?schema=public"
POSTGRES_HOST=db
POSTGRES_PORT=5432
POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_DB=ride_hailing
TOKEN_OPENROUTE_SERVICE=5b3ce3597851110001cf6248371183c5d69c41d184c801efce72e411
WOMPI_PUBLIC_KEY=pub_test_Q5yDA9xoKdePzhSGeVe9HAez7HgGORGf
WOMPI_PRIVATE_KEY=prv_prod_cldsXv764CudmClLoxc9OmRGB4R2noq1
#DATABASE_URL="postgresql://postgres:postgres@postgres:5432/Todo?schema=public"
WOMPI_URL=https://sandbox.wompi.co/v1/

````
## Note:
All these variables are public, so there is no relevance in publishing them in this project.

---

Install dependencies:

`yarn install`

Run in development:

`yarn run start`

Run in development with watch mode:

`yarn run start:dev`

Run application in production mode:

`yarn run start:prod`

Run test suite:

`yarn run test`

## Stack

This application was built with the following stack

- NestJS
- Typescript
- Prisma
  - PostgresSQL