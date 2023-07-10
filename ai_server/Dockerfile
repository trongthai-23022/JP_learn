# Sử dụng base image cho Python
FROM python:3.9

# Sao chép tất cả các tệp tin ứng dụng vào thư mục /app trong container
COPY . /app

# Đặt thư mục làm thư mục làm việc mặc định
WORKDIR /app

# Cài đặt các dependencies từ file requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Expose cổng 5000 (hoặc cổng mà ứng dụng Flask của bạn đang sử dụng)
EXPOSE 5000

RUN apt-get update && apt-get install -y libgl1-mesa-glx

# Chạy ứng dụng Flask
CMD ["python", "app.py"]
