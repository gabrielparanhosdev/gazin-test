FROM node:18.17.0-alpine


WORKDIR /usr/src/app


COPY package*.json ./


RUN npm install --omit=dev


COPY . .


RUN npm run build


EXPOSE 3000


ENV NODE_ENV=production


CMD ["npm", "run", "start"]