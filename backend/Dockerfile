# ---- Build Stage ----
FROM node:22-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---- Production Stage ----
FROM node:22-alpine

WORKDIR /usr/src/app

ENV NODE_ENV=production

COPY package*.json ./
# Instalamos solo dependencias de producción para mantener la imagen ligera
RUN npm ci --only=production

# Copiamos los archivos compilados desde la etapa de builder
COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 3014

CMD ["node", "dist/main"]