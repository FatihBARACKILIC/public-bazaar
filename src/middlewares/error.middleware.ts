import { NextFunction, Request, Response } from "express";
import BaseError from "../shared/error/base.error";
import HttpStatusCode from "../shared/enums/httpStatusCode.enum";
import logger from "../shared/utils/logger";

/**
 * Express error handler middleware.
 *
 * @param err - The error object.
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The next middleware function.
 */
const errorMiddleware = (
  err: BaseError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!err.statusCode || err.statusCode >= HttpStatusCode.INTERNAL_SERVER_ERROR)
    logger.error(err.toString());
  res.status(err.statusCode ?? HttpStatusCode.INTERNAL_SERVER_ERROR).json({
    statusCode: err.statusCode,
    error: err.name,
    message: err.message,
    stack: err.stack ?? undefined,
  });
};

export default errorMiddleware;
