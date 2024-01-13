import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger";

/**
 * Express error handler middleware.
 *
 * @param err - The error object.
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The next middleware function.
 */
const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(err);
  res.status(500).json({
    error: err.name,
    message: err.message,
    stack: err.stack ?? undefined,
  });
};

export default errorHandler;
