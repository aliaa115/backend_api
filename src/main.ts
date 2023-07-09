import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import routes from "./routes";
import {
  responseFormatterMiddleware,
  invalidPathHandler,
  responseFormatterPaginatedMiddleware,
} from "./middlewares/api/middlewareApi";
import { setMysqlConnection } from "./db/mysql/mysql_db";
import { setPgConnection } from "./db/pg/pg_db";
import { setOracleConnection } from "./db/oracle/oracle_db";

/* -------------------------- DATABASE CONNECTIONS -------------------------- */
process.env.USE_MYSQL == "true" && setMysqlConnection();
process.env.USE_POSTGRESQL == "true" && setPgConnection();
process.env.USE_ORACLE == "true" && setOracleConnection();

const app: Express = express();

/* ------------------------------- MIDDLEWARES ------------------------------ */
// Formato de respuestas de api
app.use(responseFormatterMiddleware);
app.use(responseFormatterPaginatedMiddleware);

// CORS
app.use(cors());

// Lectura del body
app.use(express.json());

// Carpeta pública
app.use(express.static("public"));

/* ---------------------------------- RUTAS --------------------------------- */
// Routes
routes(app);

/* ------------------------ MANEJO DE ERRORES DE API ------------------------ */
app.use((req, res, next) => invalidPathHandler(req, res, next));

export default app;
