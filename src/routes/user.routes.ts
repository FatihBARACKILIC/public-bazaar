import type { Express } from "express";
import BaseControllers from "../controllers/base.controllers";
import UserController, {
  IUserController,
} from "../controllers/user.controllers";
import requestHandlerFunctionTryCatch from "../shared/utils/requestHandlerFunctionTryCatch";
import BaseRoutes from "./base.routes";

class UserRoutes extends BaseRoutes {
  protected readonly router: Express;
  protected readonly routeMainURL: string;
  protected readonly controller: BaseControllers & IUserController;

  constructor(router: Express, routeMainURL: string = "/") {
    super();

    this.router = router;
    this.routeMainURL = routeMainURL;
    this.controller = new UserController();

    this.runRoutes();
  }

  protected runRoutes(): void {
    this.router.post(
      `${this.routeMainURL}user`,
      requestHandlerFunctionTryCatch(this.controller.register)
    );
  }
}

export default UserRoutes;
