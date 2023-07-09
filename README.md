# JP_learn

## Backend

### Cài đặt:
```
composer install
cp .env.example .env
```

### Cập nhật dữ liệu:
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=tendatabase
DB_USERNAME=root
DB_PASSWORD=
```

### Tạo key:
```
php artisan key:generate
```

### Tạo data:
```
php artisan migrate
php artisan db:seed
```

### Khởi động:
```
php artisan serve
```

## Frontend

### Cài đặt:
```
npm install
```

### Khởi động:
```
npm start
```

## AI Server

### Cài đặt:
```
pip install -r requirements.txt
```

### Khởi động:
```
python app.py
```

Trên đây là hướng dẫn cài đặt và khởi động các thành phần trong dự án JP_learn. Vui lòng làm theo các bước tương ứng với từng phần để cài đặt và chạy thành công dự án của bạn.
