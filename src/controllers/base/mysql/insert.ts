import { converKeys } from "../../../helppers/funciones";
import { KeysSelect } from "../../../interfaces/general/interfaces";

export const insertOrUpdateMysqlTable = async (keys: KeysSelect) => {
  try {
    const { table, orderBy, key, campos } = converKeys(keys);

    if (!mySqlClient)
      throw { message: "Coneccion con la base de datos no establecida." };

    const query = mySqlClient(table).insert(campos).onConflict(key).merge();

    orderBy.map((i: any) => query.orderBy(i[0], i[1]));

    return query.then((i) => campos);
  } catch (e) {
    throw set_error_conent(e, "Error al convertir la llave");
  }
};
