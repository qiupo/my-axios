const methodsArr = ["get", "delete", "head", "options", "put", "patch", "post"];
class InterceptorsManage {
    constructor() {
        this.handlers = [];
    }
    use(fullfield, rejected) {
        this.handlers.push({
            fullfield,
            rejected,
        });
    }
}
class Axios {
    constructor() {
        this.interceptors = {
            request: new InterceptorsManage(),
            response: new InterceptorsManage(),
        };
    }
    request(config) {
        let stack = [this.send.bind(this), null];
        this.interceptors.request.handlers.forEach((item) => {
            stack.unshift(item.fullfield, item.rejected);
        });
        this.interceptors.response.handlers.forEach((item) => {
            stack.push(item.fullfield, item.rejected);
        });
        let promise = Promise.resolve(config);
        while (stack.length > 0) {
            promise = promise.then(stack.shift(), stack.shift());
        }
        return promise;
    }
    send(config) {
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
            return this.request(Object.assign({ method: item, url: arguments[0], data: arguments[1] || {} }, (arguments[2] || {})));
        }
    };
});
export default Axios;
//# sourceMappingURL=axios.js.map