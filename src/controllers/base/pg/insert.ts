import { converKeys } from "../../../helppers/funciones";
import { KeysSelect } from "../../../interfaces/general/interfaces";

export const insertOrUpdatePgTable = async (keys: KeysSelect) => {
  try {
    const { table, orderBy, key, campos } = converKeys(keys);

    if (!pgClient)
      throw { message: "Coneccion con la base de datos no establecida." };

    const query = pgClient(table)
      .insert(campos)
      .onConflict(key)
      .merge()
      .returning("*");

    orderBy.map((i: any) => query.orderBy(i[0], i[1]));

    return query;
  } catch (e) {
    throw new Error(JSON.stringify(e, null, 2));
  }
};
