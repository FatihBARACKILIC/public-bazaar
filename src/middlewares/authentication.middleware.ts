import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "../shared/enums/httpStatusCode.enum";
import { decodeJWT } from "../shared/utils/jwt";

const authenticationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.headers["authorization"];
  if (!token) {
    res
      .status(HttpStatusCode.UNAUTHORIZED)
      .json({ message: "No token provided" });
    return;
  }

  const result = decodeJWT(token);
  if (!result.auth) {
    res.status(HttpStatusCode.UNAUTHORIZED).json({ message: "Invalid token" });
    return;
  }

  req.body._user = result.decodedKey!;

  next();
};

export default authenticationMiddleware;
