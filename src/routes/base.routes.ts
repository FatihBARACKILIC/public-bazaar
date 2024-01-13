import type { Express } from "express";
import BaseControllers from "../controllers/base.controllers";

/**
 * BaseRoutes is an abstract class that serves as a base for all routes in the application.
 * It defines the common properties and methods that all routes should have.
 */
abstract class BaseRoutes {
  protected abstract readonly router: Express;
  protected abstract readonly routeMainURL: string;
  protected abstract readonly controller: BaseControllers;

  protected abstract runRoutes(): void;
}

export default BaseRoutes;
