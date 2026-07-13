# Estágio de Build
FROM node:20-alpine AS build

WORKDIR /app

# Instala dependências
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copia o restante do projeto
COPY . .

# Executa o build do projeto (Vite/React)
RUN npm run build

# Estágio de Produção (Servidor Nginx)
FROM nginx:alpine

# Copia os arquivos buildados do estágio anterior para o Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copia uma configuração customizada do Nginx se necessário (opcional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
