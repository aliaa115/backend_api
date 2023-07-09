import { Knex, knex } from "knex";

export const setPgConnection = () => {
  try {
    if (process.env.POSTGRESQL_HOST !== "") {
      const config: Knex.Config = {
        client: "pg",
        connection: {
          host: process.env.POSTGRESQL_HOST || "",
          port: Number(process.env.POSTGRESQL_PORT || "3306"),
          user: process.env.POSTGRESQL_USER || "",
          password: process.env.POSTGRESQL_PASS || "",
          database: process.env.POSTGRESQL_DB || "",
        },
      };

      globalThis.pgClient = knex(config);
      //
      pgClient
        ?.raw("SELECT now()")
        .then(() => {
          console_log("Pg connected");
        })
        .catch((e) => {
          throw { message: "Pg not connected", e };
        });

      pgClient &&
        pgClient
          .on("start", function (query) {
            console_log({ on: "pg", type: "start", query: query.sql });
          })
          .on("query", function (query) {
            console_log({ on: "pg", type: "query", query: query.sql });
          })
          .on("query-response", function (query) {
            // console_log({ on: "pg", type: "query-response", query });
          })
          .on("query-error", function (query) {
            console_error({ on: "pg", type: "query-error", query });
          });
    } else throw { message: "Pg not connected" };
  } catch (e) {
    set_error_conent(
      e,
      "Error al establecer la conección con la base de datos [PG]"
    );
  }
};
