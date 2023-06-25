# Sử dụng image Node.js làm base
FROM node:18 AS build

# Thiết lập thư mục làm việc
WORKDIR /app

# Copy package.json và package-lock.json vào thư mục làm việc
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install

# Copy toàn bộ mã nguồn vào thư mục làm việc
COPY . .

# Build ứng dụng React
RUN npm run build

# Sử dụng image Nginx để chạy ứng dụng build
FROM nginx:latest

# Copy các tệp từ ứng dụng build vào thư mục của Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copy tệp cấu hình Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
