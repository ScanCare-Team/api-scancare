FROM node:14
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
COPY ./src /app/src
COPY .env /app/.env
ENV PORT=8080
EXPOSE ${PORT}
CMD ["npm", "start"]
