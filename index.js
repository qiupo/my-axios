import axios from "./build/index.js";

axios.interceptors.request.use(
  function (config) {
    console.log('request',config);
    return config;
  },
  function () {}
);
axios.interceptors.response.use(
  function (response) {
    console.log('response',response);
    return response;
  },
  function () {}
);
axios.request({
  method: "get",
  url: "http://localhost:3000",
  data: null,
}); // 调用 request 方法
