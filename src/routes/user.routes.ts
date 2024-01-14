import type { Express } from "express";
import BaseControllers from "../controllers/base.controllers";
import UserController, {
  IUserController,
} from "../controllers/user.controllers";
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
    // POST /api/v1/user/
    this.router.post(
      this.routeMainUrl,
      requestHandlerFunctionTryCatch(this.controller.createUser)
    );
  }
}

export default UserRoutes;
