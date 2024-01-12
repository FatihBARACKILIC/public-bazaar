import { NextFunction, Request, Response } from "express";

type RequestHandlerFunction<T = void> = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<T>;

export default RequestHandlerFunction;
