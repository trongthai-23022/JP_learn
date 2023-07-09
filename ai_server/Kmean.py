import cv2 as cv
import numpy as np
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans


# Use kmean to segment the image wrtie handwritting, and return the segmented image
def apply_kmeans(img, K=1, size=(64,64)):
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
    images = []
    for k in range(1, K+1):
        img = np.where(segmented_image == k, 255, 0)
        images.append(img)

    # Cắt ảnh hình vuông xung quang phần có nhãn
    for i in range(len(images)):
        img = images[i]
        points = np.argwhere(img == 255)
        x, y, w, h = cv.boundingRect(points)
        img = img[x:x+w, y:y+h]
        images[i] = img
    
    # Resize ảnh về kích thước 64x64
    for i in range(len(images)):
        img = images[i]
        img = cv.resize(img, size, interpolation=cv.INTER_AREA)
        images[i] = img

    return images
