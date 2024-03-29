import UnauthorizedError from "../shared/error/unauthorized.error";
import IAuthenticationServices from "../shared/interfaces/services/iAuthenticationServices.interface";
import { LoginType } from "../shared/types/user.type";
import { bcryptVerify } from "../shared/utils/bcrypt";
import { codeJWT } from "../shared/utils/jwt";
import BaseServices from "./base.services";

class AuthenticationServices
  extends BaseServices
  implements IAuthenticationServices
{
  logIn = async ({ username, email, password }: LoginType): Promise<string> => {
    let where = username ? { username } : { email };
    const unauthorizedError = new UnauthorizedError("Invalid user or password");
    try {
      const user = await this.db.users.findUnique({ where });
      if (!user) throw unauthorizedError;

      const verifyPassword = await bcryptVerify(user.password, password);
      if (!verifyPassword) throw unauthorizedError;

      const token: string = codeJWT({
        id: user.id,
        username: user.role,
        email: user.email,
        role: user.role,
      });

      return token;
    } catch (error: unknown) {
      throw error;
    }
  };
}

export default AuthenticationServices;
