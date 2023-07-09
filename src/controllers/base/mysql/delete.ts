import { converKeys } from "../../../helppers/funciones";
import { KeysDelete } from "../../../interfaces/general/interfaces";

export const deleteOrUpdateMysqlTable = async (keys: KeysDelete) => {
  try {
    const { table, orderBy, id, campos } = converKeys(keys);

    if (!mySqlClient)
      throw { message: "Coneccion con la base de datos no establecida." };

    const query = mySqlClient(table).update(campos).where(id);

    orderBy.map((i: any) => query.orderBy(i[0], i[1]));

    return query.then((i) => id);
  } catch (e) {
    throw set_error_conent(e);
  }
};
