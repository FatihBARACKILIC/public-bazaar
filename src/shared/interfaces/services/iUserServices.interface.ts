import { CreateUserType, SafeUserType, TokenType } from "../../types/user.type";

/**
 * Represents a service for managing user-related operations.
 */
interface IUserServices {
  /**
   * Creates a new user.
   * @param user - The user data.
   * @returns A promise that resolves to the created user.
   */
  createUser(user: CreateUserType): Promise<SafeUserType>;

  /**
   * Retrieves a user by username.
   * @param username - The username of the user to retrieve.
   * @returns A promise that resolves to the retrieved user, or null if not found.
   */
  getUser(username: string): Promise<SafeUserType>;

  /**
   * Updates a user.
   * @param login - The login token.
   * @param user - The user data to update.
   * @returns A promise that resolves to the updated user.
   */
  updateUser(
    _user: TokenType,
    password: string,
    user: Partial<CreateUserType>
  ): Promise<SafeUserType>;

  /**
   * Freezes a user account.
   * @param _user - The user token.
   * @param password - The password of the user.
   * @returns A promise that resolves to the frozen user.
   */
  freezeAccount(_user: TokenType, password: string): Promise<SafeUserType>;

  /**
   * Deletes a user.
   * @param user - The user to delete.
   * @returns A promise that resolves to the deleted user.
   */
  deleteUser(user: unknown): Promise<unknown>;
}

export default IUserServices;
