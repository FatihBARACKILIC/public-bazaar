import { $Enums } from "@prisma/client";
import { RegisterType, UserType } from "../shared/types/user.type";
import BaseServices from "./base.services";

interface IUserServices {
  register(user: RegisterType): Promise<UserType>;
  logIn(): Promise<UserType>;
}

class UserServices extends BaseServices implements IUserServices {
  async register(user: RegisterType): Promise<UserType> {
    try {
      const { firstName, lastName, username, email, password, role } = user;
      const newUser = await this.db.users.create({
        data: {
          firstName,
          lastName,
          username,
          email,
          password,
          role: role as $Enums.Role,
        },
      });
      return newUser as UserType;
    } catch (error) {
      throw error;
    }
  }

  async logIn(): Promise<UserType> {
    throw new Error("Method not implemented.");
  }
}

export default UserServices;
export type { IUserServices };
