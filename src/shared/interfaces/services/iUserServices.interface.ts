import {
  CreateUserType,
  UserType,
  UpdateUserType,
} from "../../types/user.type";

/**
 * Represents a set of user services.
 */
interface IUserServices {
  /**
   * Creates a new user.
   * @param user - The user data.
   * @returns A promise that resolves to the created user.
   */
  createUser(user: CreateUserType): Promise<UserType>;

  /**
   * Retrieves a user by username.
   * @param username - The username of the user to retrieve.
   * @returns A promise that resolves to the retrieved user, or null if not found.
   */
  getUser(username: string): Promise<UserType | null>;

  /**
   * Updates an existing user.
   * @param user - The updated user data.
   * @returns A promise that resolves to the updated user.
   */
  updateUser(user: UpdateUserType): Promise<UserType>;

  /**
   * Deletes a user.
   * @param user - The user to delete.
   * @returns A promise that resolves to the deleted user.
   */
  deleteUser(user: unknown): Promise<UserType>;
}

export default IUserServices;
