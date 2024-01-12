import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger";

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
