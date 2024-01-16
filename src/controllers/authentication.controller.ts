import { NextFunction, Request, Response } from "express";
import AuthenticationServices from "../services/authentication.services";
import BaseServices from "../services/base.services";
import IAuthenticationController from "../shared/interfaces/controllers/iAuthenticationControllers.interface";
import IAuthenticationServices from "../shared/interfaces/services/iAuthenticationServices.interface";
import BaseControllers from "./base.controllers";
import HttpStatusCode from "../shared/enums/httpStatusCode.enum";

class AuthenticationController
  extends BaseControllers
  implements IAuthenticationController
{
  protected readonly services: BaseServices & IAuthenticationServices;

  constructor() {
    super();

    this.services = new AuthenticationServices();
  }
  login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const token = await this.services.logIn({ ...req.body });

    res.status(HttpStatusCode.OK).json({
      message: "Logged In",
      token,
    });
  };
}

export default AuthenticationController;
