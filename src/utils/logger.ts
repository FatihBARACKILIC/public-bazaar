import pino from "pino";
import { LOG_LEVEL } from "../shared/constant/config.constant";

const logger = pino({
  timestamp: () =>
    `,"time":"${new Date().toISOString()}","timeStamp":"${Date.now()}"`,
  transport: {
    targets: [
      {
        target: "pino-pretty",
        options: {
          colorize: true,
        },
        level: LOG_LEVEL,
      },
      {
        level: "info",
        target: "pino/file",
        options: {
          destination: "logs/info.log",
        },
      },
      {
        level: "warn",
        target: "pino/file",
        options: {
          destination: "logs/warn.log",
        },
      },
      {
        level: "error",
        target: "pino/file",
        options: {
          destination: "logs/error.log",
        },
      },
      {
        level: "fatal",
        target: "pino/file",
        options: {
          destination: "logs/fatal.log",
        },
      },
    ],
  },
});

export default logger;
