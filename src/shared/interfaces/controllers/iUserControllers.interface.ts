import RequestHandlerFunction from "../../types/requestHandlerFunction.type";

/**
 * Represents a user controller interface.
 */
interface IUserController {
  /**
   * Creates a new user.
   * @param req - The request object.
   * @param res - The response object.
   * @param next - The next function.
   */
  createUser: RequestHandlerFunction;

  /**
   * Retrieves a user.
   * @param req - The request object.
   * @param res - The response object.
   * @param next - The next function.
   */
  getUser: RequestHandlerFunction;

  /**
   * Updates a user.
   * @param req - The request object.
   * @param res - The response object.
   * @param next - The next function.
   */
  updateUser: RequestHandlerFunction;

  /**
   * Freezes a user account.
   * @param req - The request object.
   * @param res - The response object.
   * @param next - The next function.
   */
  freezeAccount: RequestHandlerFunction;

  /**
   * Deletes a user.
   * @param req - The request object.
   * @param res - The response object.
   * @param next - The next function.
   */
  deleteUser: RequestHandlerFunction;
}

export default IUserController;
