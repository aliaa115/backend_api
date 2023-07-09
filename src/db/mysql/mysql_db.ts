import { Knex, knex } from "knex";

export const setMysqlConnection = () => {
  try {
    if (process.env.MYSQL_HOST !== "") {
      // ESTABLECER CONFIGURACIÓN DE CONECCIÓN
      const config: Knex.Config = {
        client: "mysql",
        connection: {
          host: process.env.MYSQL_HOST || "",
          port: Number(process.env.MYSQL_PORT || "3306"),
          user: process.env.MYSQL_USER || "",
          password: process.env.MYSQL_PASS || "",
          database: process.env.MYSQL_DB || "",
        },
      };

      // ESTABLECER LA CONECCIÓN
      globalThis.mySqlClient = knex(config);

      // COMPROBAR LA CONECCIÓN
      mySqlClient
        ?.raw("SELECT now()")
        .then(() => {
          console_log("MySQL connected");
        })
        .catch((e) => {
          console_error("MySQL not connected", e);
          throw { message: "MySQL not connected", e };
        });

      // MIDDLEWARES PARA ACCIONES AL USAR LA CONNECION
      mySqlClient &&
        mySqlClient
          .on("start", function (query) {
            console_log({ on: "mySql", type: "start", query: query.sql });
          })
          .on("query", function (query) {
            console_log({ on: "mySql", type: "query", query: query.sql });
          })
          .on("query-response", function (query) {
            // console_log({ on: "mySql", type: "query-response", query });
          })
          .on("query-error", function (query) {
            console_error({ on: "mySql", type: "query-error", query });
          });
    } else throw { message: "MySQL not connected" };
  } catch (e) {
    set_error_conent(
      e,
      "Error al establecer la conección con la base de datos [MYSQL]"
    );
  }
};
