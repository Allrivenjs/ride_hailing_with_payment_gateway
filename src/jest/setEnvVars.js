process.env.DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@db:${POSTGRES_PORT}/${POSTGRES_DB}?schema=public";
process.env.POSTGRES_HOST="db";
process.env.POSTGRES_PORT="5432";
process.env.POSTGRES_USER="user";
process.env.POSTGRES_PASSWORD="password";
process.env.POSTGRES_DB="ride_hailing";
process.env.TOKEN_OPENROUTE_SERVICE="5b3ce3597851110001cf6248371183c5d69c41d184c801efce72e411";