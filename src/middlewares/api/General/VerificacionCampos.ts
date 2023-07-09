import { NextFunction, Request, Response } from "express";

export const VerificarCampos = (
  req: Request,
  res: Response,
  next: NextFunction,
  database: any,
  camposAVerificar: string[]
) => {
  if (!database) {
    res.locals.apiResponse(
      null,
      "Error, no se posee conección a la base de datos",
      400
    );
    return;
  }

  let listaDeCampos = camposAVerificar
    .filter((campo) => !req.query[campo] && !req.body[campo])
    .map((campo) => {
      return { [campo]: `El campo es requerido para realizar la consulta` };
    });

  if (listaDeCampos.length > 0) {
    res.locals.apiResponse(
      listaDeCampos,
      "Error, campos requeridos no encontrados",
      400
    );
    return;
  }

  next();
};
