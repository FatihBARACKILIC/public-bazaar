import "dotenv/config";
import LogLevel from "../enums/logLevel.enum";

export const PORT = process.env?.PORT ?? 3000;

export const LOG_LEVEL: LogLevel =
  LogLevel[process.env?.LOG_LEVEL?.toUpperCase() as keyof typeof LogLevel] ??
  LogLevel.ERROR;

export const JWT_SECRET_KEY =
  process.env?.JWT_SECRET_KEY ?? "YOUR_JWT_SECRET_KEY";
export const JWT_EXPIRES_IN =
  process.env?.JWT_EXPIRES_IN ?? "YOUR_JWT_EXPIRES_IN";
