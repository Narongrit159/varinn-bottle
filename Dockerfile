FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY public/models /usr/share/nginx/html/models
COPY public/img /usr/share/nginx/html/img
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]