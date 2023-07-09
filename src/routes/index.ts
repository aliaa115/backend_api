import { Router, Express } from "express";
import { testRouter } from "./testingRoutes/test";
import { testMySQL } from "./testingRoutes/testMySQL";
import { testPg } from "./testingRoutes/testPg";
import { invalidPathHandler } from "../middlewares/api/middlewareApi";

const router = (app: Express) => {
  testRouter(app);
  testMySQL(app);
  testPg(app);

  const router = Router();

  router.get("/", async (req, res) => {
    res.locals.apiResponse([{ msg: "Success" }]);
  });

  app.use(router);
};

export default router;
