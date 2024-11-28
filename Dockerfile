# Gunakan Node.js versi stabil
FROM node:14

# Tentukan direktori kerja di dalam container
WORKDIR /usr/src/app

# Salin file package.json dan package-lock.json
COPY package*.json ./

# Install dependensi
RUN npm install

# Salin semua file proyek
COPY . .

# Expose port
EXPOSE 8080

# Jalankan aplikasi
CMD ["node", "app.js"]
