import { NextFunction, Request, Response } from "express";
import UserServices, { IUserServices } from "../services/user.services";
import { CreateUserType } from "../shared/types/user.type";
import BaseControllers from "./base.controllers";
import BaseServices from "../services/base.services";
import RequestHandlerFunction from "../shared/types/requestHandlerFunction.type";

interface IUserController {
  createUser: RequestHandlerFunction;
  getUser: RequestHandlerFunction;
  updateUser: RequestHandlerFunction;
  deleteUser: RequestHandlerFunction;
}

class UserController extends BaseControllers implements IUserController {
  protected readonly services: BaseServices & IUserServices;

  constructor() {
    super();

    this.services = new UserServices();
  }

  createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const newUser: CreateUserType = req.body;
    const response = await this.services.createUser(newUser);
    res.status(200).json({
      message: "User registered",
      user: response,
    });
  };

  getUser = async (req: Request, res: Response, next: NextFunction) => {
    throw new Error("Method not implemented.");
  };

  updateUser = async (req: Request, res: Response, next: NextFunction) => {
    throw new Error("Method not implemented.");
  };

  deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    throw new Error("Method not implemented.");
  };
}

export default UserController;
export { IUserController };
