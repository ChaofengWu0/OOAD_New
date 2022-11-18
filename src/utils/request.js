import axios from "axios";

const service = axios.create({
  baseURL: "http://localhost:3333",
  timeout: 5000
})


// export default axios.create({
//   timeout: 10000
// })

// 添加请求拦截器
service.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  console.log(config)
  return config;
}, function (error) {
  // 对请求错误做些什么
  console.log(error)
  return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  console.log(response)
  return response;
}, function (error) {
  // 对响应错误做点什么
  console.log(error)
  return Promise.reject(error);
});
