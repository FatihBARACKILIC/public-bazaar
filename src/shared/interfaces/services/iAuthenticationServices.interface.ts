import { LoginType } from "../../types/user.type";

/**
 * Represents the interface for authentication services.
 */
interface IAuthenticationServices {
  /**
   * Logs in the user with the provided credentials.
   * @param {LoginType} credentials - The login credentials.
   * @returns {Promise<string>} - A promise that resolves to a string representing the authentication token.
   */
  logIn({ username, email, password }: LoginType): Promise<string>;
}

export default IAuthenticationServices;
