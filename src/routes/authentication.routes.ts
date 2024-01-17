import { Express } from "express";
import AuthenticationController from "../controllers/authentication.controller";
import BaseControllers from "../controllers/base.controllers";
import IAuthenticationController from "../shared/interfaces/controllers/iAuthenticationControllers.interface";
import requestHandlerFunctionTryCatch from "../shared/utils/requestHandlerFunctionTryCatch";
import AuthenticationValidation from "../shared/validations/authentication.validations";
import BaseRoutes from "./base.routes";
import validationMiddleware from "../middlewares/validation.middleware";

class AuthenticationRoutes extends BaseRoutes {
  protected readonly router: Express;
  protected readonly controller: BaseControllers & IAuthenticationController;
  protected readonly validations: AuthenticationValidation;

  constructor(router: Express) {
    super("login");

    this.router = router;
    this.controller = new AuthenticationController();
    this.validations = new AuthenticationValidation();

    this.runRoutes();
  }

  protected runRoutes(): void {
    // POST /login
    this.router.post(
      this.routeMainUrl,
      validationMiddleware(this.validations.login),
      requestHandlerFunctionTryCatch(this.controller.login)
    );
  }
}

export default AuthenticationRoutes;
