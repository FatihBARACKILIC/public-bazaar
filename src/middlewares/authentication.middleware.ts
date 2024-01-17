import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "../enums/httpStatusCode.enum";
import { decodeJWT } from "../utils/jwt";

const authenticationMiddle = async (
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

export default authenticationMiddle;
