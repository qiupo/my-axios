interface axiosConfig {
  method: string;
  url: string;
  data: any;
}

type promiseType = (config: axiosConfig|Error|object) => any;
type handlersType = { fullfield: promiseType; rejected: promiseType }
