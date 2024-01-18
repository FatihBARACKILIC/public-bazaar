import { NextFunction, Request, RequestHandler, Response } from "express";
import Joi from "joi";
import ValidationError from "../shared/error/validation.error";

const validationMiddleware = (schema: Joi.ObjectSchema): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error, value } = schema.validate(req.body);

    if (error) throw new ValidationError(error);

    req.body = value;
    next();
  };
};

export default validationMiddleware;
