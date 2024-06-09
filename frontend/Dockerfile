FROM node:18.17.0-alpine


WORKDIR /app


COPY package*.json ./


RUN npm install --omit=dev


COPY . .


RUN npm run build


EXPOSE 3007


ENV NODE_ENV=production


CMD ["npm", "run", "start"]