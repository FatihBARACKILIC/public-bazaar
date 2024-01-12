import cors from "cors";
import type { Express, NextFunction, Request, Response } from "express";
import express from "express";
import helmet from "helmet";
import logger from "../utils/logger";

abstract class BaseConfigMiddleware {
  protected abstract setExpress: () => void;
  protected abstract setCors: () => void;
  protected abstract setHelmet: () => void;
  protected abstract setLogger: () => void;
}

class ConfigMiddlewares extends BaseConfigMiddleware {
  private readonly app: Express;

  constructor(app: Express) {
    super();

    this.app = app;

    this.setCors();
    this.setHelmet();
    this.setExpress();
    this.setLogger();
  }

  protected setExpress = () => {
    this.app.use(express.json());
  };

  protected setCors = () => {
    this.app.use(cors({ origin: "*" }));
  };

  protected setHelmet = () => {
    this.app.use(
      helmet({
        contentSecurityPolicy: {
          directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'"],
            styleSrc: [],
          },
        },
        referrerPolicy: { policy: "same-origin" },
        dnsPrefetchControl: true,
        frameguard: true,
        hidePoweredBy: true,
        hsts: true,
        ieNoOpen: true,
        noSniff: true,
        xssFilter: true,
      })
    );
  };

  protected setLogger = () => {
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      const { method, url } = req;
      const startTime = Date.now();

      res.on("finish", () => {
        const elapsedTime = Date.now() - startTime;
        const { statusCode } = res;
        logger.info(
          `${method} ${url}, status: ${statusCode}, time: ${elapsedTime}ms`
        );
      });

      next();
    });
  };
}

export default ConfigMiddlewares;
