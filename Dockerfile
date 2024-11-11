# Etapa 1: Construcción de la aplicación con Node.js
FROM node:18 as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: Nginx con HTTP/3 y HTTPS
FROM nginx:alpine

# Copiar los certificados y la configuración de Nginx
COPY nginx/cert.pem /etc/nginx/cert.pem
COPY nginx/privkey.pem /etc/nginx/privkey.pem
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Copiar la aplicación construida
COPY --from=build /app/build /usr/share/nginx/html

# Exponer los puertos 80
EXPOSE 80 443

# Iniciar Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]
