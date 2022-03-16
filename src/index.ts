import Axios from "./axios";
import merage from "./utils/merage";
// 最终导出axios的方法，即实例的request方法
function CreateAxiosFn() {
  // let req: Axios = axios.request.bind(axios);
  // 并入Axios的方法
  class req extends Axios{
    constructor(){
      super();
    }
  }
  // merage(req,new Axios(),axios)
  return new req();
}

// 得到最后的全局变量axios
export default CreateAxiosFn();
