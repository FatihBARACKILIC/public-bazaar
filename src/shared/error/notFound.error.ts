import HttpStatusCode from "../enums/httpStatusCode.enum";
import BaseError from "./base.error";

class NotFoundError extends BaseError {
  constructor(message: string = "Not Found!") {
    super(HttpStatusCode.NOT_FOUND, "NotFound", message);
  }
}

export default NotFoundError;
