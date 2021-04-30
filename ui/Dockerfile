
#build 
FROM node:alpine AS build-deps

WORKDIR /app
COPY package.json .
RUN npm install
COPY . ./

RUN npm run build

#deploy

FROM nginx:1.12-alpine
COPY --from=build-deps /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]