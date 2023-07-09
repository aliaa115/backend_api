// mySqlClient
import { Express, Router } from "express";

export const testRouter = (app: Express) => {
  const testRouter = Router();

  testRouter.get("/", async (req, res) => {
    let pgConnected = false,
      oracleConnected = false,
      mysqlConnected = false;

    pgClient &&
      (await pgClient
        .raw("SELECT now()")
        .then(() => {
          pgConnected = true;
        })
        .catch((e) => {
          pgConnected = false;
        }));
    mySqlClient &&
      (await mySqlClient
        .raw("SELECT now()")
        .then(() => {
          mysqlConnected = true;
        })
        .catch((e) => {
          mysqlConnected = false;
        }));
    oracleClient &&
      (await oracleClient
        .raw("SELECT now()")
        .then(() => {
          oracleConnected = true;
        })
        .catch((e) => {
          oracleConnected = false;
        }));

    res.locals.apiResponse([
      { msg: "Success", pgConnected, mysqlConnected, oracleConnected },
    ]);
  });

  app.use("/test", testRouter);
};
