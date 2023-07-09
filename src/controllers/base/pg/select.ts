import { converKeys } from "../../../helppers/funciones";
import { KeysSelect } from "../../../interfaces/general/interfaces";

export const selectPgTable = async (keys: KeysSelect) => {
  const { table, key, condiciones, incluir, orderBy } = converKeys(keys);
  if (!pgClient)
    throw { message: "Coneccion con la base de datos no establecida." };
  if (!table) throw { message: "No se encontró la tabla a consultar." };

  const query = pgClient(table);

  orderBy &&
    (await Promise.all(
      orderBy.map(async (i: any) => await query.orderBy(i[0], i[1]))
    ));

  return query;
};
