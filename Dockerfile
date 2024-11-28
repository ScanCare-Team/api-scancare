FROM node:14
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV PORT=8080
ENV FIREBASE_KEY_FILE_PATH=/app/src/config/project-scancare-3455aa2c9529.json
EXPOSE ${PORT}
CMD ["npm", "start"]
