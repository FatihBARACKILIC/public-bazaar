import RequestHandlerFunction from "../../types/requestHandlerFunction.type";

/**
 * Represents the interface for product controllers.
 */
interface IProductControllers {
  /**
   * Creates a new product.
   * @param req - The request object.
   * @param res - The response object.
   * @param next - The next function.
   */
  createProduct: RequestHandlerFunction;

  /**
   * Updates an existing product.
   * @param req - The request object.
   * @param res - The response object.
   * @param next - The next function.
   */
  updateProduct: RequestHandlerFunction;

  /**
   * Deletes a product.
   * @param req - The request object.
   * @param res - The response object.
   * @param next - The next function.
   */
  deleteProduct: RequestHandlerFunction;

  /**
   * Retrieves all products.
   * @param req - The request object.
   * @param res - The response object.
   * @param next - The next function.
   */
  getProducts: RequestHandlerFunction;

  /**
   * Retrieves all products with seller information.
   * @param req - The request object.
   * @param res - The response object.
   * @param next - The next function.
   */
  getProductsWithSeller: RequestHandlerFunction;

  /**
   * Retrieves a specific product.
   * @param req - The request object.
   * @param res - The response object.
   * @param next - The next function.
   */
  getProduct: RequestHandlerFunction;
}

export default IProductControllers;
