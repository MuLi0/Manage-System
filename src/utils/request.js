//在文件中引入 axios
import axios from "axios";

// 创建对象，自定义实例默认值
const service = axios.create({
  // process.env.NODE_ENV === 'development' 来判断是否开发环境
  // 基础 URL https://www.easy-mock.com/mock/592501a391470c0ac1fab128
  baseURL: "#",
  // 请求延时时间，如果请求超过了这个时间，请求中断
  timeout: 5000,
});

// 请求拦截器，拦截请求前对数据进行处理
service.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    return config;
  },
  (error) => {
    // 在请求发生错误时做些什么
    console.log(error);
    return Promise.reject();
  }
);

// 响应拦截器，拦截请求后对数据进行处理
service.interceptors.response.use(
  (response) => {
    // 对响应数据做些什么
    if (response.status === 200) {
      return response.data;
    } else {
      Promise.reject();
    }
  },
  (error) => {
    // 对响应发生错误时做些什么
    console.log(error);
    return Promise.reject();
  }
);

export default service;
