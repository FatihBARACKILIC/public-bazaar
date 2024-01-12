import { NextFunction, Request, Response } from "express";
import RequestHandlerFunction from "../types/requestHandlerFunction.type";

const requestHandlerFunctionTryCatch = (
  fn: RequestHandlerFunction<unknown>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

export default requestHandlerFunctionTryCatch;
