FROM node:22.14-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG BUILD_DATE=unknown
ENV BUILD_DATE=${BUILD_DATE}

RUN npm run build

FROM nginx:latest

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
