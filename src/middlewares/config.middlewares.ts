import cors from "cors";
import type { Express, NextFunction, Request, Response } from "express";
import express from "express";
import helmet from "helmet";
import logger from "../shared/utils/logger";

/**
 * Base class for configuring middlewares in Express.
 */
abstract class BaseConfigMiddleware {
  protected abstract setExpress: () => void;
  protected abstract setCors: () => void;
  protected abstract setHelmet: () => void;
  protected abstract setLogger: () => void;
}

/**
 * ConfigMiddlewares class is responsible for setting up various middlewares for the Express app.
 */
class ConfigMiddlewares extends BaseConfigMiddleware {
  private readonly app: Express;

  constructor(app: Express) {
    super();

    this.app = app;

    this.setLogger();
    this.setCors();
    this.setHelmet();
    this.setExpress();
  }

  /**
   * Sets up the Express middleware for the application.
   */
  protected setExpress = () => {
    this.app.use(express.json());
  };

  /**
   * Sets up the CORS middleware for the application.
   */
  protected setCors = () => {
    this.app.use(cors({ origin: "*" }));
  };

  /**
   * Sets the helmet middleware for enhanced security.
   */
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

  /**
   * Sets up a logger middleware that logs request details and response time.
   */
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
