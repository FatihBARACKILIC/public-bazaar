import type { Express, NextFunction, Request, Response } from "express";
import express from "express";
import AuthenticationRoutes from "./routes/authentication.routes";
import UserRoutes from "./routes/user.routes";
import { API_URL } from "./shared/constant/app.constant";
import { PORT } from "./shared/constant/config.constant";
import NotFoundError from "./shared/error/notFound.error";
import logger from "./shared/utils/logger";
import ConfigMiddlewares from "./middlewares/config.middlewares";
import errorMiddleware from "./middlewares/error.middleware";
import ProductRoutes from "./routes/product.routes";

/**
 * Represents the main application class.
 * This class is responsible for setting up the express app, configuring middlewares, setting routes, and handling errors.
 */
class App {
  private readonly app: Express;
  private static _isRunning: boolean = false;

  public get isRunning(): boolean {
    return App._isRunning;
  }

  public static get isRunning(): boolean {
    return App._isRunning;
  }

  constructor() {
    this.app = express();

    this.setConfig();
    this.setRoutes();
    this.setNotFoundErrorHandling();
    this.setErrorHandling();
  }

  /**
   * Configures the application by initializing the necessary middlewares.
   */
  private setConfig = (): void => {
    new ConfigMiddlewares(this.app);
  };

  /**
   * Sets the routes for the application.
   */
  private setRoutes = (): void => {
    new UserRoutes(this.app);
    new AuthenticationRoutes(this.app);
    new ProductRoutes(this.app);
  };

  /**
   * Sets up the error handling middleware for the application.
   */
  private setNotFoundErrorHandling = (): void => {
    this.app.all("*", (req: Request, res: Response, next: NextFunction) => {
      next(new NotFoundError("Page Not Found"));
    });
  };

  /**
   * Sets up the error handling middleware for the application.
   */
  private setErrorHandling = (): void => {
    this.app.use(errorMiddleware);
  };

  /**
   * Starts the application.
   */
  public startApp = (): void => {
    if (App._isRunning) {
      logger.warn(`App is already running`);
    } else {
      this.app.listen(PORT, () => {
        logger.info({
          mainUrl: `http://localhost:${PORT}`,
          apiUrl: `http://localhost:${PORT}${API_URL}`,
        });
      });
      App._isRunning = true;
    }
  };

  public static startApp = (): void => {
    new App().startApp();
  };
}

export default App;
