import { NextFunction, Request, Response } from "express";
import RequestHandlerFunction from "../types/requestHandlerFunction.type";

/**
 * Wraps a request handler function with a try-catch block to handle any errors that occur during execution.
 * @param fn - The request handler function to be wrapped.
 * @returns A new request handler function that catches any errors and passes them to the next middleware.
 */
const requestHandlerFunctionTryCatch = (
  fn: RequestHandlerFunction<unknown>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

export default requestHandlerFunctionTryCatch;
