import type { Express } from "express";
import BaseControllers from "../controllers/base.controllers";
import UserController from "../controllers/user.controllers";
import IUserController from "../shared/interfaces/controllers/iUserControllers.interface";
import requestHandlerFunctionTryCatch from "../shared/utils/requestHandlerFunctionTryCatch";
import BaseRoutes from "./base.routes";

class UserRoutes extends BaseRoutes {
  protected readonly router: Express;
  protected readonly controller: BaseControllers & IUserController;

  constructor(router: Express) {
    super("user");

    this.router = router;
    this.controller = new UserController();

    this.runRoutes();
  }

  protected runRoutes(): void {
    // POST /user
    this.router.post(
      this.routeMainUrl,
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
      requestHandlerFunctionTryCatch(this.controller.getUser)
    );
    // PATCH /user
    this.router.patch(
      this.routeMainUrl,
      requestHandlerFunctionTryCatch(this.controller.getUser)
    );
  }
}

export default UserRoutes;
