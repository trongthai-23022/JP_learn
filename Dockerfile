# Base image
FROM ubuntu:latest

# RUN ln -fs /usr/share/zoneinfo/Asia/Ho_Chi_Minh /etc/localtime \
#     && export DEBIAN_FRONTEND=noninteractive \
#     && apt-get update \
#     && apt-get install -y tzdata

# Cài đặt các gói cần thiết
RUN apt-get update \
    && apt-get install -y curl git nginx

# Cài đặt Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs

# Cài đặt Python và pip
# RUN apt-get install -y python3 python3-pip

# RUN apt-get install -y php


# Cài đặt Composer
# RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# RUN apt-get update && apt-get install -y libxml2-dev libcurl4-openssl-dev php-dom php-xml php-curl

# Sao chép ứng dụng Laravel, ReactJS và Flask vào container
# COPY back_end /app/laravel-app
COPY front_end /app/react-app
# COPY ai_server /app/flask-app

# Cài đặt các gói cần thiết cho Laravel
# RUN cd /app/laravel-app \
#     && composer install

# # Cài đặt các gói cần thiết cho Flask
# RUN cd /app/flask-app \
#     && pip3 install -r requirements.txt

# Thay đổi thư mục làm việc đến ứng dụng ReactJS
WORKDIR /app/react-app

# Cài đặt các gói cần thiết cho ReactJS
RUN npm install \
    && npm run build

# Cấu hình Nginx
COPY nginx/default.conf /etc/nginx/sites-available/default

# Mở cổng
EXPOSE 80

EXPOSE 3000

# Khởi động Nginx và các ứng dụng
CMD service nginx start \
    # && cd /app/laravel-app \
    # && php artisan serve --host=0.0.0.0 --port=8000 \
    # && cd /app/flask-app \
    # && python3 app.py   \
    && cd /app/react-app \
    && npm start
