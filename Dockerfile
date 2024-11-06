# Etapa 1: Construcción
FROM node:20.18-alpine as build

# Crear directorio de la app en el contenedor
WORKDIR /app

# Copiar solo el archivo de configuración de npm
COPY package.json ./
COPY package-lock.json ./

# Instalar dependencias
RUN npm install --production

# Establecer variable de entorno para permitir algoritmos de hash
ENV NODE_OPTIONS=--openssl-legacy-provider

# Copiar el resto del código fuente
COPY . .

# Construir el proyecto
RUN npm run build

# Etapa 2: Imagen final de producción
FROM nginx:stable-alpine

# Copiar archivos estáticos de la etapa de construcción al servidor NGINX
COPY --from=build /app/build /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Ejecutar NGINX
CMD ["nginx", "-g", "daemon off;"]
