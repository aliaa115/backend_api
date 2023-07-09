/* -------------------- CARGAR DOTENV ANTES DEL SERVIDOR -------------------- */
import "./src/helppers/globals";
import "./src/middlewares/logs/logMidlewares";
import "./src/middlewares/general/errors";

import dotenv from "dotenv";
dotenv.config();

/* --------------------------- INICIAR EL SERVIDOR -------------------------- */
import app from "./src/main";

const port = process.env.PORT;
const server = process.env.SERVER;

app.listen(port, () => {
  console_log(`⚡️[server]: Server is running at ${server}:${port}`);
});
