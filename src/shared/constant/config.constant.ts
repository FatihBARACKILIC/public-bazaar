import "dotenv/config";
import LogLevel from "../enums/logLevel.enum";

export const PORT = process.env?.PORT ?? 3000;

export const LOG_LEVEL: LogLevel =
  LogLevel[process.env?.LOG_LEVEL?.toUpperCase() as keyof typeof LogLevel] ??
  LogLevel.ERROR;
