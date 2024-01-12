import type { Express } from "express";
import BaseController from "../controllers/base.controllers";

abstract class BaseRoutes {
  protected abstract readonly router: Express;
  protected abstract readonly routeMainURL: string;
  protected abstract readonly controller: BaseController;

  protected abstract runRoutes(): void;
}

export default BaseRoutes;
