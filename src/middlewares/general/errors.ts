import "../../helppers/globals";
import { MyError } from "../../interfaces/general/errorInterfaces";

globalThis.get_error_conent = (e) => {
  if (typeof e === "object" && e !== null) {
    return e as MyError;
  } else {
    return e;
  }
};

globalThis.set_error_conent = (err, sub_message: any): MyError => {
  let e = get_error_conent(err);
  if (typeof e == "object") {
    throw {
      message: e.message,
      sub_message: e.sub_message || sub_message,
      stack: e.stack,
    };
  } else if (typeof e === "string") throw new Error(err);
  else throw new Error(`${err}`);
};
