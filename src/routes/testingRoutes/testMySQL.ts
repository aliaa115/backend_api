// mySqlClient
import { Express, Router } from "express";
import { insertOrUpdateMysqlTable } from "../../controllers/base/mysql/insert";
import {
  selectMysqlTable,
  selectOneMysqlTable,
} from "../../controllers/base/mysql/select";
import { VerificarCampos } from "../../middlewares/api/General/VerificacionCampos";
import { invalidPathHandler } from "../../middlewares/api/middlewareApi";
import { deleteOrUpdateMysqlTable } from "../../controllers/base/mysql/delete";

export const testMySQL = (app: Express) => {
  const testMySQL = Router();

  testMySQL.get("/test", async (req, res) => {
    mySqlClient &&
      mySqlClient("test").then((i) => {
        res.locals.apiResponse([{ msg: "Success", i }]);
      });
  });

  testMySQL.get(
    "/select",
    (req, res, next) => {
      VerificarCampos(req, res, next, mySqlClient, ["table"]);
    },
    async (req, res) => {
      selectMysqlTable({ ...req.query, ...req.body })
        .then((result) => res.locals.apiResponse(result))
        .catch((e) => {
          console_catch(e);
          res.locals.apiResponse(
            { ...e },
            "Error al realizar la consulta",
            400
          );
        });
    }
  );

  testMySQL.get(
    "/selectOne",
    (req, res, next) => {
      VerificarCampos(req, res, next, mySqlClient, ["table", "id"]);
    },
    (req, res) => {
      selectOneMysqlTable(req.query)
        .then((result) => res.locals.apiResponse(result))
        .catch((e) => {
          console_catch({ e });
          res.locals.apiResponse(
            { ...e },
            "Error al realizar la consulta",
            400
          );
        });
    }
  );

  testMySQL.post(
    "/insert",
    (req, res, next) => {
      VerificarCampos(req, res, next, mySqlClient, ["table", "campos", "key"]);
    },
    async (req, res) => {
      insertOrUpdateMysqlTable({ ...req.query, ...req.body })
        .then((result) => res.locals.apiResponse(result))
        .catch((e) => {
          res.locals.apiResponse(
            { ...e },
            "Error al realizar la consulta",
            400
          );
        });
    }
  );

  testMySQL.delete(
    "/delete",
    (req, res, next) => {
      VerificarCampos(req, res, next, mySqlClient, ["table", "campos", "id"]);
    },
    async (req, res) => {
      deleteOrUpdateMysqlTable({ ...req.query, ...req.body })
        .then((result) => res.locals.apiResponse(result))
        .catch((e) => {
          res.locals.apiResponse(
            { ...e },
            "Error al realizar la consulta",
            400
          );
        });
    }
  );

  testMySQL.get("/", async (req, res) => {
    let mysqlConnected = false;

    mySqlClient &&
      (await mySqlClient
        .raw("SELECT now()")
        .then(() => {
          mysqlConnected = true;
        })
        .catch((e) => {
          mysqlConnected = false;
        }));

    res.locals.apiResponse([{ msg: "Success", mysqlConnected }]);
  });

  app.use("/mysql", testMySQL);
  app.use((req, res, next) => invalidPathHandler(req, res, next));
};
