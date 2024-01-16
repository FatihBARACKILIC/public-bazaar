import type { Express } from "express";
import express from "express";
import UserRoutes from "./routes/user.routes";
import { API_URL } from "./shared/constant/app.constant";
import { PORT } from "./shared/constant/config.constant";
import errorHandler from "./shared/error/errorHandler";
import ConfigMiddlewares from "./shared/middlewares/config.middlewares";
import logger from "./shared/utils/logger";
import AuthenticationRoutes from "./routes/authentication.routes";

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
  };

  /**
   * Sets up the error handling middleware for the application.
   */
  private setErrorHandling = (): void => {
    this.app.use(errorHandler);
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
