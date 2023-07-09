import cv2 as cv
import skimage.transform
import Labels
from werkzeug.utils import secure_filename
import os
import base64
import imutils
import random
from sklearn.cluster import KMeans
import numpy as np


def pixel_belongs_to_text(pixel):
    if pixel[3] == 255:
        return True
    else:
        return False

def preprocess_image(image):
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
    return gray_image

def apply_kmeans(img, K=1, size=(64, 64)):
    # Lấy ảnh đầu vào và chuyển sang ảnh xám
    image = img

    # Lọc ra tọa độ các điểm có giá trị 255 (màu trắng)
    points = np.argwhere(image == 0)

    # Kmeans các điểm màu trắng
    kmeans = KMeans(n_clusters=K, random_state=0).fit(points)
    centers = kmeans.cluster_centers_

    # Tạo ảnh mới với các điểm màu trắng được gán nhãn
    labels = kmeans.predict(points) + 1
    segmented_image = np.zeros_like(image)
    segmented_image[points[:, 0], points[:, 1]] = labels

    # Cắt ảnh với các điểm có nhãn từ 1 đến K
    sorted_indices = np.argsort(centers[:, 1])
    arrayImg = np.arange(1,K+1)
    arrayImg = arrayImg[sorted_indices]

    images = []
    for k in arrayImg:
        img = np.where(segmented_image == k, 255, 0)
        images.append(img)

    # Cắt ảnh hình vuông xung quang phần có nhãn
    for i in range(len(images)):
        img = images[i]
        points = np.argwhere(img == 255)
        x, y, w, h = cv.boundingRect(points)
        img = img[x:x+w, y:y+h]
        images[i] = img

    # Resize ảnh
    resized_images = []
    for img in images:
        resized_img = cv.resize(img.astype(float), (size[1], size[0]))  # Chỉnh lại thứ tự kích thước
        resized_images.append(resized_img)

    return resized_images

def readAndProcessImg(image_path):
    # Đọc ảnh bằng OpenCV
    image = cv.imread(image_path, cv.IMREAD_UNCHANGED)

    image = preprocess_image(image)

    characters=[]
    for i in range(1,5):
        images = apply_kmeans(image, K=int(i), size=(64, 64))
        characters.append(images)
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

