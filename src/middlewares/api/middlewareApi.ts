import { NextFunction, Request, Response } from "express";

export const responseFormatterMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Función para dar formato a la respuesta
  const apiResponse = (data: any, message: string, status: number = 200) => {
    res.status(status).json({
      message: message || "OK",
      count: Array.isArray(data) ? data.length : undefined,
      data: data,
    });
  };

  // Almacenar la función en res.locals
  res.locals.apiResponse = apiResponse;

  next();
};

export const responseFormatterPaginatedMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Función para dar formato a la respuesta
  const paginationResponse = (
    data: any,
    message: string,
    status: number = 200
  ) => {
    let { d, currentPage, totalPages, perPage } = data;
    res.status(status).json({
      message: message || "OK",
      currentPage: currentPage,
      totalPages: totalPages,
      perPage: perPage,
      data: d,
    });
  };

  // Almacenar la función en res.locals
  res.locals.paginationResponse = paginationResponse;

  next();
};

export const invalidPathHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(400);
  res.json({ msg: "Ruta no encontrada" });
};
// export default apiMiddleware;
