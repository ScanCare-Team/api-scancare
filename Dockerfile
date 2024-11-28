# Gunakan Node.js versi stabil
FROM node:14

# Tentukan direktori kerja di dalam container
WORKDIR /src/app

# Salin file package.json dan package-lock.json
COPY package*.json ./

# Install dependensi
RUN npm install

# Salin semua file proyek
COPY . .

ENV PORT 8000
# Expose port
EXPOSE ${PORT}

# Jalankan aplikasi
CMD ["npm", "start"]
