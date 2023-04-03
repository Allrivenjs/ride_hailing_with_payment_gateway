## Ride hailing

Simple API for a Ride Hailing like app

## Getting started

To run this project, you must clone down this repository. You will also need `node` and `npm` installed globally on your machine.

Setup dockerfile:

`docker compose -f .\docker-compose.yaml up -d --build`

Run:

`npx prisma migrate dev`

environment variables in docker
````
- POSTGRES_HOST=db
- POSTGRES_PORT=5432
- POSTGRES_USER=user
- POSTGRES_PASSWORD=password
- POSTGRES_DB=ride_hailing
- DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@db:${POSTGRES_PORT}/${POSTGRES_DB}?schema=public"
- WOMPI_PUBLIC_KEY=pub_test_EjcgGnHhlLadwW52vNRlX2iGM31wRYLM
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
#DATABASE_URL="postgresql://postgres:postgres@postgres:5432/Todo?schema=public"
WOMPI_URL=https://sandbox.wompi.co/v1/

````
## Note:
All these variables are public, so there is no relevance in publishing them in this project.

I must emphasize that if you run the project from docker, the `url` environment variable should look like this = `"postgresql://user:password@db:5432/ride_hailing?schema=public"`, otherwise it should stay like this:  `"postgresql://user:password@localhost:5432/ride_hailing?schema=public"`.

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

Run push db:

`npx prisma db push`

Run create migration:

`npx prisma migrate dev`

---
### Recommendations
First I recommend that you run it mainly before starting the seeds,

> seed.seeders.spec.ts

then you can start the tests, one by one, or all at once.

La estructura es esta:
``` 
├──app
│ ├────controllers
│ │ └──rides
│ ├────DTO
│ ├────middlewares
│ │ ├────all-exceptions-filter
│ │ └────correlation-id
│ └────services
│ ├─────businessLogic
│ ├────calculate
│ ├────models
│ │ ├──card
│ │ ├──driver
│ │ ├───payment
│ │ ├──rider
│ │ ├──travel
│ │ └──user
│ └────wompi
├───config
└───jest

```

in each one you will find their respective test of the functionalities.

This is the relational structure that was created for this business model.
![img.png](img.png)



## Stack

This application was built with the following stack

- NestJS
- Typescript
- Prisma
  - PostgresSQL