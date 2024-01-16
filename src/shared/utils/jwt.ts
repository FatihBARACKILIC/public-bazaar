import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET_KEY } from "../constant/config.constant";
import ms from "ms";
import { TokenType } from "../types/user.type";

const codeJWT = (data: TokenType): string => {
  const hashedKey = jwt.sign(data, JWT_SECRET_KEY, {
    expiresIn: ms(JWT_EXPIRES_IN),
    algorithm: "HS512",
  });
  return hashedKey;
};

const decodeJWT = (key: string) => {
  const decodedKey = jwt.verify(key, JWT_SECRET_KEY);
  return decodedKey;
};

export { codeJWT, decodeJWT };
