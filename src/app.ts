import type { Express } from "express";
import express from "express";
import ConfigMiddlewares from "./shared/middlewares/config.middlewares";
import UserRoutes from "./routes/user.routes";
import { PORT } from "./shared/constant/config.constant";
import errorHandler from "./shared/error/errorHandler";
import logger from "./shared/utils/logger";

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

    this.config();
    this.setRoutes();
    this.setErrorHandling();
  }

  private config = (): void => {
    new ConfigMiddlewares(this.app);
  };

  private setRoutes = (): void => {
    new UserRoutes(this.app);
  };

  private setErrorHandling = (): void => {
    this.app.use(errorHandler);
  };

  public startApp = (): void => {
    if (App._isRunning) {
      logger.warn(`App is already running`);
    } else {
      this.app.listen(PORT, () => {
        logger.info(`http://localhost:${PORT}`);
      });
      App._isRunning = true;
    }
  };

  public static startApp = (): void => {
    new App().startApp();
  };
}

export default App;
