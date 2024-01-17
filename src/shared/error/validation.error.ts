import Joi from "joi";
import HttpStatusCode from "../enums/httpStatusCode.enum";
import BaseError from "./base.error";

class ValidationError extends BaseError {
  constructor(message: string | Joi.ValidationError) {
    let errorMessage = "";
    if (message instanceof Joi.ValidationError) {
      message.details.map((error) => (errorMessage += `${error.message}`));
    } else {
      errorMessage = message;
    }
    super(HttpStatusCode.UNPROCESSABLE_ENTITY, "ValidationError", errorMessage);
  }
}

export default ValidationError;
