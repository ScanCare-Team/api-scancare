FROM node:14
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
COPY ./src/config/project-scancare-3455aa2c9529.json /app/src/config/project-scancare-3455aa2c9529.json
ENV PORT=8080
EXPOSE ${PORT}
CMD ["npm", "start"]
