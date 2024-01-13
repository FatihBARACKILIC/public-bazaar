import { $Enums } from "@prisma/client";
import type {
  CreateUserType,
  UpdateUserType,
  UserType,
} from "../shared/types/user.type";
import BaseServices from "./base.services";

interface IUserServices {
  createUser(user: CreateUserType): Promise<UserType>;
  getUser(username: string): Promise<UserType>;
  updateUser(user: UpdateUserType): Promise<UserType>;
  deleteUser(user: unknown): Promise<UserType>;
}

class UserServices extends BaseServices implements IUserServices {
  protected readonly allReturns: { [key: string]: unknown };

  constructor() {
    super();

    this.allReturns = {
      id: true,
      firstName: true,
      lastName: true,
      username: true,
      email: true,
      password: true,
      created_at: true,
      updated_at: true,
      role: true,
    };
  }

  async createUser(user: CreateUserType): Promise<UserType> {
    try {
      // const { firstName, lastName, username, email, password, role } = user;
      const newUser = await this.db.users.create({
        data: {
          ...user,
          role: user.role as $Enums.Role,
        },
        select: {
          ...this.allReturns,
          created_at: false,
          updated_at: false,
        },
      });
      return newUser as UserType;
    } catch (error) {
      throw error;
    }
  }

  getUser(username: string): Promise<UserType> {
    throw new Error("Method not implemented.");
  }

  updateUser(user: UpdateUserType): Promise<UserType> {
    throw new Error("Method not implemented.");
  }

  deleteUser(user: unknown): Promise<UserType> {
    throw new Error("Method not implemented.");
  }
}

export default UserServices;
export type { IUserServices };
