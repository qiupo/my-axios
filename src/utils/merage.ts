import Axios from "../axios";
function merage(a: Axios, b: Axios, context: Axios) {
  Object.defineProperty(b, "request", { enumerable: true });
  for (let key in b) {
    console.log(key);
    if (b.hasOwnProperty(key)) {
      if (typeof b[key] === "function") {
        a[key] = b[key].bind(context);
      } else {
        a[key] = b[key];
      }
    }
  }
}
export default merage;
