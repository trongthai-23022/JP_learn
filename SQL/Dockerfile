FROM mysql:8.0

# Sao chép tệp data.sql vào thư mục /docker-entrypoint-initdb.d trong container
COPY data.sql /docker-entrypoint-initdb.d/

# Thiết lập cấu hình MySQL
ENV MYSQL_DATABASE=jplearn
ENV MYSQL_ALLOW_EMPTY_PASSWORD=yes

# Thiết lập cổng 3306
EXPOSE 3306
