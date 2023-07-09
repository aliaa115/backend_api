import { converKeys } from "../../../helppers/funciones";
import { KeysSelect } from "../../../interfaces/general/interfaces";

export const selectMysqlTable = async (keys: KeysSelect) => {
  try {
    const { table, condiciones, incluir, orderBy } = converKeys(keys);

    if (!mySqlClient)
      throw { message: "Coneccion con la base de datos no establecida." };
    if (!table) throw { message: "No se encontró la tabla a consultar." };

    const query = mySqlClient(table);

    orderBy &&
      (await Promise.all(
        orderBy.map(async (i: any) => await query.orderBy(i[0], i[1]))
      ));

    return query;
  } catch (e) {
    throw set_error_conent(e, "Error al convertir la llave");
  }
};

export const selectOneMysqlTable = async (keys: KeysSelect) => {
  try {
    const { table, orderBy, id } = converKeys(keys);

    if (!mySqlClient)
      throw { message: "Coneccion con la base de datos no establecida." };

    const query = mySqlClient(table).where(id).first();

    orderBy.map((i: any) => query.orderBy(i[0], i[1]));

    return await query
      .then((i) => {
        console_log(i);
        return i;
      })
      .catch((e) => {
        console_error({ e });
        throw new Error(
          "Error al realizar la accion " + JSON.stringify(e, null, 2)
        );
      });
  } catch (e) {
    throw set_error_conent(e, "Error al convertir la llave");
  }
};
