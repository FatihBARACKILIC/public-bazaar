import HttpStatusCode from "../enums/httpStatusCode.enum";
import BaseError from "./base.error";

class UnauthorizedError extends BaseError {
  constructor(message: string = "Unauthorized!") {
    super(HttpStatusCode.UNAUTHORIZED, "Unauthorized", message);
  }
}

export default UnauthorizedError;
