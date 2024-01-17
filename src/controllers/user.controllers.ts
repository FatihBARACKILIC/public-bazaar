import { NextFunction, Request, Response } from "express";
import BaseServices from "../services/base.services";
import UserServices from "../services/user.services";
import HttpStatusCode from "../shared/enums/httpStatusCode.enum";
import IUserController from "../shared/interfaces/controllers/iUserControllers.interface";
import IUserServices from "../shared/interfaces/services/iUserServices.interface";
import {
  CreateUserType,
  SafeUserType,
  TokenType,
} from "../shared/types/user.type";
import BaseControllers from "./base.controllers";

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

  getUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const user: SafeUserType = await this.services.getUser(req.params.username);
    res.status(HttpStatusCode.OK).json({
      message: "User Information",
      user,
    });
  };

  updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const {
      _user,
      password,
      user: uUser,
    }: {
      _user: TokenType;
      password: string;
      user: Partial<CreateUserType>;
    } = req.body;
    const user: SafeUserType = await this.services.updateUser(
      _user,
      password,
      uUser
    );
    res.status(HttpStatusCode.OK).json({
      message: "User Updated",
      user,
    });
  };

  freezeAccount = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { _user, password }: { _user: TokenType; password: string } =
      req.body;
    const user: SafeUserType = await this.services.freezeAccount(
      _user,
      password
    );
    res.status(HttpStatusCode.OK).json({
      message: "Account freezed",
      user,
    });
  };

  deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    throw new Error("Method not implemented.");
  };
}

export default UserController;
