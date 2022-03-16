function merage(a, b, context) {
    Object.defineProperty(b, "request", { enumerable: true });
    for (let key in b) {
        console.log(key);
        if (b.hasOwnProperty(key)) {
            if (typeof b[key] === "function") {
                a[key] = b[key].bind(context);
            }
            else {
                a[key] = b[key];
            }
        }
    }
}
export default merage;
//# sourceMappingURL=merage.js.map