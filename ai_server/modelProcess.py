import cv2 as cv
import skimage.transform
import Labels
from werkzeug.utils import secure_filename
import os
import base64
import imutils
import random

import numpy as np

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
        image = cv.cvtColor(image, cv.COLOR_BGRA2BGR)

    # Chuyển đổi ảnh sang ảnh xám
    gray_image = cv.cvtColor(image, cv.COLOR_BGR2GRAY)

    gray_image = abs(255-gray_image)
    # Áp dụng biến đổi histogram cân bằng
    equalized = cv.equalizeHist(gray_image)
    
    # Áp dụng xử lý ngưỡng (thresholding)
    _, threshold = cv.threshold(equalized, 0, 255, cv.THRESH_BINARY_INV | cv.THRESH_OTSU)
    
    # Áp dụng kỹ thuật dilation và erosion
    kernel = cv.getStructuringElement(cv.MORPH_RECT, (3, 3))
    dilated = cv.dilate(threshold, kernel, iterations=3)
    eroded = cv.erode(dilated, kernel, iterations=3)
    
    # Tìm các đường viền (contours)
    contours, _ = cv.findContours(eroded, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE)
    
    # Sắp xếp contours theo thứ tự từ trái sang phải và từ trên xuống dưới
    contours = sorted(contours, key=lambda ctr: cv.boundingRect(ctr)[0])
    
    # Khởi tạo danh sách để lưu trữ các ký tự đã cắt
    characters = []
    
    for contour in contours:
        # Lọc đường viền dựa trên diện tích và hình dạng
        x, y, w, h = cv.boundingRect(contour)
        aspect_ratio = w / float(h)
        min_area = 0
        max_aspect_ratio = 10
        min_aspect_ratio = 0.2
        
        if cv.contourArea(contour) > min_area and min_aspect_ratio < aspect_ratio < max_aspect_ratio:
            # Tính toán vị trí và kích thước của khung chứa ký tự
            frame_size = max(w, h)
            frame_x = x + (w - frame_size) // 2
            frame_y = y + (h - frame_size) // 2
            
            # Cắt vùng chữ viết từ ảnh gốc và điều chỉnh kích thước về target_size
            character = equalized[frame_y:frame_y+frame_size, frame_x:frame_x+frame_size]
            resized_character = cv.resize(character, target_size, interpolation=cv.INTER_AREA)
            
            # Tính toán kích thước padding dựa trên tỷ lệ cho mỗi phía
            padding_top = int(character.shape[0] * 0.2)
            padding_bottom = int(character.shape[0] * 0.1)
            padding_left = int(character.shape[1] * 0.15)
            padding_right = int(character.shape[1] * 0.2)
            
            # Thêm padding với kích thước tính toán
            padded_character = np.pad(character, ((padding_top, padding_bottom), (padding_left, padding_right)), mode='constant', constant_values=255)
            
            # Điều chỉnh kích thước về target_size
            resized_character = cv.resize(padded_character, target_size, interpolation=cv.INTER_AREA)
            
            # Thêm ký tự đã xử lý vào danh sách
            characters.append(resized_character)
    
    return characters

def modify_thickness(image, thickness_factor):
    # Chuyển đổi ảnh sang dạng xám
    gray_image = cv.cvtColor(image, cv.COLOR_BGR2GRAY)
    # Chuyển đổi ảnh thành ảnh nhị phân
    _, binary_image = cv.threshold(gray_image, 127, 255, cv.THRESH_BINARY)
    # Tìm các đường viền trong ảnh nhị phân
    contours, _ = cv.findContours(binary_image, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE)
    
    # Tạo một bản sao của ảnh gốc
    modified_image = np.copy(image)
    
    # Vẽ lại các đường viền với độ dày/mỏng tùy chỉnh
    cv.drawContours(modified_image, contours, -1, (0, 0, 0), thickness=int(thickness_factor))
    
    return modified_image
def readAndProcessImg(image_path):
    # Đọc ảnh bằng OpenCV
    image = cv.imread(image_path, cv.IMREAD_UNCHANGED)
    # Tạo danh sách ảnh với độ dày/mỏng tùy chỉnh
    modified_images = []
    for factor in range(1, 5):
        if factor <= 4:
            thickness_factor = random.randint(1, 10)
        else:
            thickness_factor = 0
        modified_image = modify_thickness(image, thickness_factor)  # Điều chỉnh độ dày/mỏng của chữ viết
        modified_images.append(modified_image)
    # Thêm ảnh gốc vào danh sách ảnh
    modified_images.append(image)
    # Xử lý và chuyển đổi các ảnh thành danh sách các ký tự
    characters = []
    for modified_image in modified_images:
        processed_image = preprocess_image(modified_image, target_size=(64, 64))
        characters.append(processed_image)

    return characters
def remove_file(path):
	for f in os.listdir(path):
		os.remove(os.path.join(path,f))
def covertBase64ToImg(base64_data):
    save_dir= 'upload/'
    image_filename = "requestImg" + ".png"
    # Giải mã ảnh từ base64
    image_bytes = base64.b64decode(base64_data)
    # Lưu ảnh từ mảng byte
    with open(os.path.join(save_dir, image_filename), "wb") as image_file:
        image_file.write(image_bytes)

