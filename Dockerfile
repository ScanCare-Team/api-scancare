# Gunakan Node.js versi stabil
FROM node:14

# Tentukan direktori kerja di dalam container
WORKDIR /usr/src

# Salin file package.json dan package-lock.json
COPY package*.json ./

# Install dependensi
RUN npm install

# Salin semua file proyek
COPY . .

ENV PORT 800
# Expose port
EXPOSE ${PORT}

# Jalankan aplikasi
CMD ["npm", "start"]
