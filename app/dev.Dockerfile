# Dev dockerfile, meant to bootstrap an instance to run angular
# in watch mode

FROM node:20 as angular

RUN npm install -g @angular/cli@18

WORKDIR /app

COPY ./package.json .
RUN npm install

COPY . .

EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0"]