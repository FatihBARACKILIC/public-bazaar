import HttpStatusCode from "../enums/httpStatusCode.enum";

abstract class BaseError extends Error {
  public readonly statusCode: HttpStatusCode;
  public readonly name: string;
  public readonly message: string;
  public readonly stack?: string;

  constructor(
    statusCode: HttpStatusCode = HttpStatusCode.INTERNAL_SERVER_ERROR,
    name: string,
    message: string,
    stack?: string
  ) {
    super();

    this.statusCode = statusCode;
    this.name = name;
    this.message = message;
    this.stack = stack;
  }

  public toString = (): string => {
    let message: string = `${this.statusCode} | ${this.name} => ${this.message}`;
    if (this.stack) message += `\n${this.stack}`;
    return message;
  };
}

export default BaseError;
