import Axios from "./axios";
function CreateAxiosFn() {
    class req extends Axios {
        constructor() {
            super();
        }
    }
    return new req();
}
export default CreateAxiosFn();
//# sourceMappingURL=index.js.map