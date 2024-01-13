import { NextFunction, Request, Response } from "express";
import UserServices, { IUserServices } from "../services/user.services";
import { RegisterType } from "../shared/types/user.type";
import BaseControllers from "./base.controllers";
import BaseServices from "../services/base.services";

interface IUserController {
  register(req: Request, res: Response, next: NextFunction): Promise<void>;
}

class UserController extends BaseControllers implements IUserController {
  protected readonly services: BaseServices & IUserServices;

  constructor() {
    super();

    this.services = new UserServices();
  }

  register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const newUser: RegisterType = req.body;
    const response = await this.services.register(newUser);
    res.status(200).json({
      message: "User registered",
      user: response,
    });
  };
}

export default UserController;
export { IUserController };
