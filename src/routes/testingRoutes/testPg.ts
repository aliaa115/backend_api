// PgClient
import { Express, Router } from "express";
import { selectPgTable } from "../../controllers/base/pg/select";
import { insertOrUpdatePgTable } from "../../controllers/base/pg/insert";
import { VerificarCampos } from "../../middlewares/api/General/VerificacionCampos";

export const testPg = (app: Express) => {
  const testPg = Router();

  testPg.get("/test", async (req, res) => {
    pgClient &&
      pgClient("test").then((i) => {
        res.locals.apiResponse([{ msg: "Success", i }]);
      });
  });

  testPg
    .use((req, res, next) => {
      VerificarCampos(req, res, next, pgClient, ["table"]);
    })
    .get("/select", async (req, res) => {
      selectPgTable(req.query)
        .then((result) => res.locals.apiResponse(result))
        .catch((e) => {
          res.locals.apiResponse(e, "Error al realizar la consulta", 400);
        });
    });

  testPg
    .use((req, res, next) => {
      VerificarCampos(req, res, next, pgClient, ["table", "campos"]);
    })
    .post("/insert", async (req, res) => {
      insertOrUpdatePgTable({ ...req.query, ...req.body })
        .then((result) => res.locals.apiResponse(result))
        .catch((e) => {
          console_log(e);
          res.locals.apiResponse(e, "Error al realizar la consulta", 400);
        });
    });

  testPg.get("/", async (req, res) => {
    let PgConnected = false;

    pgClient &&
      (await pgClient
        .raw("SELECT now()")
        .then(() => {
          PgConnected = true;
        })
        .catch((e) => {
          PgConnected = false;
        }));

    res.locals.apiResponse([{ msg: "Success", PgConnected }]);
  });

  app.use("/pg", testPg);
};
