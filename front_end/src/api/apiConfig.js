import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

const refreshToken = async () => {
  try {
    const response = await instance.post('/refresh'); // Điền endpoint cho việc làm mới token
    const { access_token } = response.data;
    return access_token;
  } catch (error) {
    // Xử lý lỗi khi không thể làm mới token
    throw error;
  }
};

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Kiểm tra mã trạng thái lỗi 401 và chưa gửi yêu cầu làm mới token trước đó
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const access_token = await refreshToken();
        // Lưu token mới vào local storage hoặc cookie
        localStorage.setItem('jwtToken', access_token);

        // Thay đổi Authorization header với token mới
        instance.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

        // Gửi lại yêu cầu ban đầu với token mới
        return instance(originalRequest);
      } catch (refreshError) {
        // Xóa token khỏi local storage hoặc cookie
        localStorage.removeItem('jwtToken');
        
        // Xóa Authorization header
        delete instance.defaults.headers.common['Authorization'];

        // Chuyển hướng người dùng đến trang đăng nhập
        
        throw refreshError;
      }
    }

    // Xử lý lỗi khác
    
    // Xóa token khỏi local storage hoặc cookie
    localStorage.removeItem('jwtToken');
    
    // Xóa Authorization header
    delete instance.defaults.headers.common['Authorization'];

    // Chuyển hướng người dùng đến trang đăng nhập
    
    return Promise.reject(error);
  }
);


export const setAuthToken = (token) => {
  if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers.common['Authorization'];
  }
};

export const removeAuthToken = () => {
  delete instance.defaults.headers.common['Authorization'];
};

export default instance;

