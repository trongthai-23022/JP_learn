# Sử dụng hình ảnh Laravel PHP fpm chính thức
FROM php:8.1.0-fpm

# Cài đặt các gói phụ thuộc
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip

# Cài đặt extension PHP
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd  

# Đặt thư mục làm việc của Docker
WORKDIR /var/www/html

# Cài đặt composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Đặt biến môi trường để cho phép chạy Composer với quyền root/super user
ENV COMPOSER_ALLOW_SUPERUSER 1

# Sao chép các tệp cấu hình và mã nguồn của Laravel vào thư mục làm việc của Docker
COPY . .

# Cài đặt các gói phụ thuộc của Composer
RUN composer install --no-interaction
RUN composer update lcobucci/clock
RUN composer update
# Cấu hình quyền file và thư mục
RUN chown -R www-data:www-data \
    /var/www/html/storage \
    /var/www/html/bootstrap/cache

# Tạo khối lệnh khi khởi động container
CMD php artisan serve --host=0.0.0.0 --port=8000
