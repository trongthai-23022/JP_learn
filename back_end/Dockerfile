# Sử dụng image PHP Apache
FROM php:8.1.0-apache

# Cài đặt các phần mềm và extension cần thiết
RUN apt-get update && apt-get install -y \
    libonig-dev \
    libzip-dev \
    zip \
    unzip \
    && rm -rf /var/lib/apt/lists/*

RUN docker-php-ext-install pdo_mysql mbstring zip

RUN a2enmod rewrite

# Thiết lập thư mục làm việc
WORKDIR /var/www/html

# Copy mã nguồn ứng dụng Laravel vào thư mục làm việc
COPY . /var/www/html

# Thiết lập quyền cho thư mục storage và bootstrap/cache
RUN chown -R www-data:www-data \
    /var/www/html/storage \
    /var/www/html/bootstrap/cache

# Cài đặt Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Cài đặt dependencies của ứng dụng Laravel
RUN composer install --no-interaction --no-scripts --prefer-dist

# Tạo key ứng dụng Laravel
RUN php artisan key:generate

# Phân quyền cho thư mục storage
RUN chmod -R 777 /var/www/html/storage

# Mở cổng 80 cho Apache
EXPOSE 80

# CMD ["php", "-S", "0.0.0.0:8000", "-t", "/var/www/html/public"] (Dùng cho PHP Built-in Server)

# Chạy Apache
CMD ["apache2-foreground"]
