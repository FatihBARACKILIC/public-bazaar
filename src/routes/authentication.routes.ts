import { Express } from "express";
import BaseControllers from "../controllers/base.controllers";
import BaseRoutes from "./base.routes";
import AuthenticationController from "../controllers/authentication.controller";
import IAuthenticationController from "../shared/interfaces/controllers/iAuthenticationControllers.interface";
import requestHandlerFunctionTryCatch from "../shared/utils/requestHandlerFunctionTryCatch";

class AuthenticationRoutes extends BaseRoutes {
  protected router: Express;
  protected controller: BaseControllers & IAuthenticationController;

  constructor(router: Express) {
    super();

    this.router = router;
    this.controller = new AuthenticationController();

    this.runRoutes();
  }

  protected runRoutes(): void {
    // POST /login
    this.router.post(
      this.generateSanitizedRouteUrl("login"),
      requestHandlerFunctionTryCatch(this.controller.login)
    );
  }
}

export default AuthenticationRoutes;
