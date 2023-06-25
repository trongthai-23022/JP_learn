import cv2
import numpy as np
import matplotlib.pyplot as plt

def pixel_belongs_to_text(pixel):
    if pixel[3] == 255:
        return True
    else:
        return False

def preprocess_image(image, target_size):
    # Kiểm tra kích thước của ảnh và số kênh
    if image.shape[2] == 4:
        for y in range(image.shape[0]):
            for x in range(image.shape[1]):
                # Kiểm tra xem pixel (x, y) có thuộc vùng chữ viết hay không
                if pixel_belongs_to_text(image[y, x]):
                    # Đặt giá trị màu thành trắng
                    image[y, x] = (255, 255, 255, 255)
        # Xóa kênh trong suốt
        image = cv2.cvtColor(image, cv2.COLOR_BGRA2BGR)

    # Chuyển đổi ảnh sang ảnh xám
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    gray_image = abs(255-gray_image)
    # Áp dụng biến đổi histogram cân bằng
    equalized = cv2.equalizeHist(gray_image)
    
    # Áp dụng xử lý ngưỡng (thresholding)
    _, threshold = cv2.threshold(equalized, 0, 255, cv2.THRESH_BINARY_INV | cv2.THRESH_OTSU)
    
    # Áp dụng kỹ thuật dilation và erosion
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (3, 3))
    dilated = cv2.dilate(threshold, kernel, iterations=2)
    eroded = cv2.erode(dilated, kernel, iterations=2)
    
    # Tìm các đường viền (contours)
    contours, _ = cv2.findContours(eroded, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    # Sắp xếp contours theo thứ tự từ trái sang phải và từ trên xuống dưới
    contours = sorted(contours, key=lambda ctr: (cv2.boundingRect(ctr)[1], cv2.boundingRect(ctr)[0]))
    
    # Khởi tạo danh sách để lưu trữ các ký tự đã cắt
    characters = []
    prev_y = -1
    
    for contour in contours:
        # Lọc đường viền dựa trên diện tích và hình dạng
        x, y, w, h = cv2.boundingRect(contour)
        aspect_ratio = w / float(h)
        min_area = 100
        max_aspect_ratio = 10
        min_aspect_ratio = 0.2
        
        if cv2.contourArea(contour) > min_area and min_aspect_ratio < aspect_ratio < max_aspect_ratio:
            # Tính toán vị trí và kích thước của khung chứa ký tự
            frame_size = max(w, h)
            frame_x = x + (w - frame_size) // 2
            frame_y = y + (h - frame_size) // 2
            
            # Cắt vùng chữ viết từ ảnh gốc và điều chỉnh kích thước về target_size
            character = equalized[frame_y:frame_y+frame_size, frame_x:frame_x+frame_size]
            resized_character = cv2.resize(character, target_size, interpolation=cv2.INTER_AREA)
            
            # Thêm ký tự đã xử lý vào danh sách
            if prev_y != -1 and frame_y > prev_y:
                # Tạo khoảng trống giữa các hàng dọc
                characters.append(np.zeros(target_size, dtype=np.uint8))
            characters.append(resized_character)
            prev_y = frame_y
    
    return characters

# Đường dẫn đến ảnh PNG có nền trong suốt
image_path = 'upload/requestImg.png'

# Đọc ảnh bằng OpenCV
image = cv2.imread(image_path, cv2.IMREAD_UNCHANGED)

# Xử lý và chuyển đổi ảnh thành danh sách các ký tự
characters = preprocess_image(image, target_size=(48, 48))

# Hiển thị từng ký tự
for character in characters:
    plt.imshow(character, cmap='gray')
    plt.show()
