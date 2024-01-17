import { NextFunction, Request, RequestHandler, Response } from "express";
import Joi from "joi";
import HttpStatusCode from "../enums/httpStatusCode.enum";

interface ValidationError {
  message: string;
  type: string;
}

interface JoiError {
  status: string;
  error: {
    original: unknown;
    details: ValidationError[];
  };
}

const validationMiddleware = (schema: Joi.ObjectSchema): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error, value } = schema.validate(req.body);
    if (error) {
      const joiError: JoiError = {
        status: "failed",
        error: {
          original: error._original,
          details: error.details.map(({ message, type }: ValidationError) => ({
            message: message.replace(/['"]/g, ""),
            type,
          })),
        },
      };

      res.status(HttpStatusCode.UNPROCESSABLE_ENTITY).json(joiError);
      return;
    }

    req.body = value;
    next();
  };
};

export default validationMiddleware;
