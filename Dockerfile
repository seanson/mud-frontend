FROM node as build-deps

WORKDIR /app/
COPY package.json yarn.lock /app/
RUN npm install

COPY . /app/

ARG REACT_APP_SOCKET_URL="ws://localhost:8080"
ARG NODE_ENV=production

ENV REACT_APP_SOCKET_URL $REACT_APP_SOCKET_URL
ENV NODE_ENV $NODE_ENV

RUN npm run build

FROM nginx:1.12-alpine
COPY --from=build-deps /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
