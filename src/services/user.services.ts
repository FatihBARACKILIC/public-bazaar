import { $Enums } from "@prisma/client";
import IUserServices from "../shared/interfaces/services/iUserServices.interface";
import type {
  CreateUserType,
  SafeUserType,
  TokenType,
  UserType,
} from "../shared/types/user.type";
import { bcryptHash, bcryptVerify } from "../shared/utils/bcrypt";
import BaseServices from "./base.services";
import NotFoundError from "../shared/error/notFound.error";
import UnauthorizedError from "../shared/error/unauthorized.error";
import mail from "../shared/utils/mail";

class UserServices extends BaseServices implements IUserServices {
  private readonly userNotFound = new NotFoundError("User not found");
  private readonly invalidPassword = new UnauthorizedError("Invalid password!");

  createUser = async (user: CreateUserType): Promise<SafeUserType> => {
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

      const result: UserType = await this.db.users.create({
        data: {
          firstName,
          lastName,
          username,
          email,
          password: hashedPassword,
          role: role as $Enums.Role,
        },
      });
      const { password: _, ...safeData } = result;

      await mail(safeData);

      return safeData;
    } catch (error: unknown) {
      throw error instanceof Error ? error : new Error(error as string);
    }
  };

  getUser = async (username: string): Promise<SafeUserType> => {
    try {
      const user: UserType | null = await this.db.users.findUnique({
        where: {
          username,
        },
      });

      if (!user) throw this.userNotFound;

      const { password: _, ...safeData } = user;

      return safeData;
    } catch (error: unknown) {
      throw error instanceof Error ? error : new Error(error as string);
    }
  };

  updateUser = async (
    _user: TokenType,
    password: string,
    user: Partial<CreateUserType>
  ): Promise<SafeUserType> => {
    try {
      const existsUser: UserType | null = await this.db.users.findUnique({
        where: {
          id: _user.id,
        },
      });

      if (!existsUser) throw this.userNotFound;

      const verifiedPassword: boolean = await bcryptVerify(
        existsUser.password,
        password
      );
      if (!verifiedPassword) throw this.invalidPassword;

      if (user.password) user.password = await bcryptHash(user.password);

      const updatedUser: UserType = await this.db.users.update({
        data: { ...user },
        where: { id: _user.id },
      });

      const { password: _, ...safeData } = updatedUser;

      return safeData;
    } catch (error: unknown) {
      throw error instanceof Error ? error : new Error(error as string);
    }
  };

  freezeAccount = async (
    _user: TokenType,
    password: string
  ): Promise<SafeUserType> => {
    try {
      const existsUser: UserType | null = await this.db.users.findUnique({
        where: {
          id: _user.id,
        },
      });
      if (!existsUser) throw this.userNotFound;

      const verifiedPassword: boolean = await bcryptVerify(
        existsUser.password,
        password
      );
      if (!verifiedPassword) throw this.invalidPassword;

      const updatedUser: UserType = await this.db.users.update({
        data: { isActive: false },
        where: { id: _user.id },
      });
      const { password: _, ...safeData } = updatedUser;

      return safeData;
    } catch (error: unknown) {
      throw error instanceof Error ? error : new Error(error as string);
    }
  };

  deleteUser = async (user: unknown): Promise<unknown> => {
    try {
      // TODO: delete user permanently
      throw new Error("Method not implemented.");
      return {} as UserType;
    } catch (error: unknown) {
      throw error instanceof Error ? error : new Error(error as string);
    }
  };
}

export default UserServices;
