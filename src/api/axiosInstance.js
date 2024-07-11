import axios from "axios";
import NProgress from "nprogress";
const baseUrl = "http://localhost:8081/api/v1/";

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 300,
});

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

// Thêm một bộ đón chặn request
axiosInstance.interceptors.request.use(
  function (config) {
    NProgress.start();
    const token = "";
    config.headers.Authorization = `Bearer ${token}`;

    // Kiểm tra nếu dữ liệu là FormData thì cấu hình headers
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  function (error) {
    // Làm gì đó với lỗi request
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    NProgress.done();
    return response && response.data ? response.data : response;
  },
  function (error) {
    NProgress.done();

    return error && error.response && error.response.data
      ? error.response.data
      : Promise.reject(error);
  }
);

export default axiosInstance;
