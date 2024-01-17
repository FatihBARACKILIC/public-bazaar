import type { Express } from "express";
import BaseControllers from "../controllers/base.controllers";
import UserController from "../controllers/user.controllers";
import IUserController from "../shared/interfaces/controllers/iUserControllers.interface";
import requestHandlerFunctionTryCatch from "../shared/utils/requestHandlerFunctionTryCatch";
import BaseRoutes from "./base.routes";
import UserValidations from "../shared/validations/user.validations";
import validationMiddleware from "../middlewares/validation.middleware";
import authenticationMiddle from "../middlewares/authentication.middleware";

class UserRoutes extends BaseRoutes {
  protected readonly router: Express;
  protected readonly controller: BaseControllers & IUserController;
  protected readonly validations: UserValidations;

  constructor(router: Express) {
    super("user");

    this.router = router;
    this.controller = new UserController();
    this.validations = new UserValidations();

    this.runRoutes();
  }

  protected runRoutes(): void {
    // POST /user
    this.router.post(
      this.routeMainUrl,
      validationMiddleware(this.validations.createUser),
      requestHandlerFunctionTryCatch(this.controller.createUser)
    );
    // GET /user/:username
    this.router.get(
      this.generateSanitizedRouteUrl(":username"),
      requestHandlerFunctionTryCatch(this.controller.getUser)
    );
    // PUT /user
    this.router.put(
      this.routeMainUrl,
      validationMiddleware(this.validations.updateUser),
      authenticationMiddle,
      requestHandlerFunctionTryCatch(this.controller.updateUser)
    );
    // PATCH /user
    this.router.patch(
      this.routeMainUrl,
      validationMiddleware(this.validations.updateUser),
      authenticationMiddle,
      requestHandlerFunctionTryCatch(this.controller.updateUser)
    );
    // PATCH /user/freeze
    this.router.patch(
      this.generateSanitizedRouteUrl("freeze"),
      validationMiddleware(this.validations.onlyPassword),
      authenticationMiddle,
      requestHandlerFunctionTryCatch(this.controller.freezeAccount)
    );
    // DELETE /user
    this.router.delete(
      this.routeMainUrl,
      validationMiddleware(this.validations.onlyPassword),
      authenticationMiddle,
      requestHandlerFunctionTryCatch(this.controller.deleteUser)
    );
  }
}

export default UserRoutes;
