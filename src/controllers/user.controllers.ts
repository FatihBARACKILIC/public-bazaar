import { NextFunction, Request, Response } from "express";
import BaseServices from "../services/base.services";
import UserServices from "../services/user.services";
import IUserController from "../shared/interfaces/controllers/iUserControllers.interface";
import IUserServices from "../shared/interfaces/services/iUserServices.interface";
import { CreateUserType } from "../shared/types/user.type";
import BaseControllers from "./base.controllers";
import HttpStatusCode from "../shared/enums/httpStatusCode.enum";

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
    res.status(HttpStatusCode.CREATED).json({
      message: "User Created",
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
