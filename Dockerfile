FROM node:18-alpine3.16

# Crear directorio de la aplicación
WORKDIR /app

# Copiar archivo de dependencias y de código fuente
COPY package*.json ./
COPY src ./src

# Instalar dependencias
RUN npm install

# Expone el puerto 3000
EXPOSE 3000

# Inicia la aplicación
CMD ["npx", "prisma", "db", "push"]
CMD ["npm", "run", "start:prod"]
