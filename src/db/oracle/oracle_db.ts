import { Knex, knex } from "knex";

export const setOracleConnection = () => {
  try {
    if (process.env.ORACLE_HOST !== "") {
      const config: Knex.Config = {
        client: "oracledb",
        connection: {
          host: process.env.ORACLE_HOST || "",
          port: Number(process.env.ORACLE_PORT || "3306"),
          user: process.env.ORACLE_USER || "",
          password: process.env.ORACLE_PASS || "",
          database: process.env.ORACLE_DB || "",
        },
      };

      globalThis.oracleClient = knex(config);

      oracleClient
        ?.raw("SELECT now()")
        .then(() => {
          console_log("Oracle connected");
        })
        .catch((e) => {
          throw { message: "Oracle not connected", e };
        });
    } else
      throw set_error_conent(
        "No se encontraron las credenciales para conectarce la la base de datos. En caso de no requerir la conección, favor de desacticar la configuración."
      );
  } catch (e) {
    set_error_conent(
      e,
      "Error al establecer la conección con la base de datos [ORACLE]"
    );
  }
};
