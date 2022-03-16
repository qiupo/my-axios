const methodsArr = ["get", "delete", "head", "options", "put", "patch", "post"];
class InterceptorsManage {
  public handlers: handlersType[];
  constructor() {
    this.handlers = [];
  }
  public use(fullfield: promiseType, rejected: promiseType) {
    this.handlers.push({
      fullfield,
      rejected,
    });
  }
}
class Axios {
  [x: string]: any;
  public interceptors: {
    request: InterceptorsManage;
    response: InterceptorsManage;
  };
  constructor() {
    this.interceptors = {
      request: new InterceptorsManage(),
      response: new InterceptorsManage(),
    };
  }
  public request(config: axiosConfig) {
    let stack: promiseType[] = [this.send.bind(this), null];
    //请求拦截
    this.interceptors.request.handlers.forEach((item) => {
      stack.unshift(item.fullfield, item.rejected);
    });

    //响应拦截
    this.interceptors.response.handlers.forEach((item) => {
      stack.push(item.fullfield, item.rejected);
    });

    let promise = Promise.resolve(config); //把config包入promise ，实现config传递
    while (stack.length>0) {
      promise = promise.then(stack.shift(), stack.shift());
    }
    return promise;
  }
  private send(config: axiosConfig) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(config.method, config.url, true);
      xhr.onload = function () {
        console.log(xhr.responseText);
        resolve(xhr.responseText);
      };
      xhr.send(config.data);
    });
  }
}
methodsArr.forEach((item) => {
  Axios.prototype[item] = function () {
    console.log("执行方法" + item);
    if (["get", "delete", "head", "options"].includes(item)) {
      return this.request({
        method: item,
        url: arguments[0],
        data: arguments[1] || {},
        ...(arguments[2] || {}),
      });
    }
  };
});
export default Axios;
