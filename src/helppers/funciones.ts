import { MyError } from "../interfaces/general/errorInterfaces";
import { KeysDelete, KeysSelect } from "../interfaces/general/interfaces";

export const converKeys = (keys: KeysDelete | KeysSelect) => {
  try {
    return {
      table: keys.table ? keys.table : "",
      key:
        "key" in keys && keys.key
          ? typeof keys.key == "string"
            ? JSON.parse(keys.key)
            : keys.key
          : [""],
      id:
        "id" in keys && keys.id
          ? typeof keys.id == "string"
            ? JSON.parse(keys.id)
            : keys.id
          : undefined,
      campos:
        "campos" in keys && keys.campos
          ? typeof keys.campos == "string"
            ? JSON.parse(keys.campos)
            : keys.campos
          : undefined,
      condiciones:
        "condiciones" in keys && keys.condiciones
          ? typeof keys.condiciones == "string"
            ? JSON.parse(keys.condiciones)
            : keys.condiciones
          : undefined,
      incluir:
        "incluir" in keys && keys.incluir
          ? typeof keys.incluir == "string"
            ? JSON.parse(keys.incluir)
            : keys.incluir
          : undefined,
      orderBy:
        "orderBy" in keys && keys.orderBy
          ? typeof keys.orderBy == "string"
            ? JSON.parse(keys.orderBy)
            : keys.orderBy
          : [],
      state:
        "state" in keys && keys.state
          ? typeof keys.state == "string"
            ? JSON.parse(keys.state)
            : keys.state
          : undefined,
    };
  } catch (err) {
    throw set_error_conent(err, "Error al convertir la llave");
  }
};
