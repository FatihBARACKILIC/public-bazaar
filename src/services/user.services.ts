import { $Enums } from "@prisma/client";
import IUserServices from "../shared/interfaces/services/iUserServices.interface";
import type { CreateUserType, UserType } from "../shared/types/user.type";
import BaseServices from "./base.services";
import { bcryptHash } from "../shared/utils/bcrypt";

class UserServices extends BaseServices implements IUserServices {
  createUser = async (user: CreateUserType): Promise<UserType> => {
    try {
      const {
        firstName,
        lastName,
        username,
        email,
        password,
        role,
      }: CreateUserType = user;
      const hashedPassword = await bcryptHash(password);

      const newUser: UserType = await this.db.users.create({
        data: {
          firstName,
          lastName,
          username,
          email,
          password: hashedPassword,
          role: role as $Enums.Role,
        },
      });
      return newUser;
    } catch (error: unknown) {
      throw error instanceof Error ? error : new Error(error as string);
    }
  };

  getUser = async (username: string): Promise<UserType | null> => {
    try {
      const user: UserType | null = await this.db.users.findUnique({
        where: {
          username,
        },
      });

      return user;
    } catch (error) {
      throw error;
    }
  };

  updateUser = async (user: Partial<CreateUserType>): Promise<UserType> => {
    throw new Error("Method not implemented.");
  };

  deleteUser = async (user: unknown): Promise<UserType> => {
    throw new Error("Method not implemented.");
  };
}

export default UserServices;
