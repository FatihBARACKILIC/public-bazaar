import { CreateProductType, ProductType } from "../../types/product.type";
import { TokenType } from "../../types/user.type";

/**
 * Represents the interface for product services.
 */
interface IProductServices {
  /**
   * Creates a new product.
   * @param user - The user token.
   * @param product - The product details.
   * @returns A promise that resolves to the created product.
   */
  createProduct(
    user: TokenType,
    product: CreateProductType
  ): Promise<ProductType>;

  /**
   * Updates an existing product.
   * @param user - The user token.
   * @param password - The user password.
   * @param product - The updated product details.
   * @returns A promise that resolves to the updated product.
   */
  updateProduct(
    user: TokenType,
    password: string,
    id: string,
    product: Partial<CreateProductType>
  ): Promise<ProductType>;

  /**
   * Deletes a product.
   * @param user - The user token.
   * @param password - The user password.
   * @param product - The product to be deleted.
   * @returns A promise that resolves to the result of the deletion.
   */
  deleteProduct(
    user: TokenType,
    password: string,
    id: string,
    product: unknown
  ): Promise<unknown>;

  /**
   * Retrieves a list of products.
   * @param pageNumber - The page number.
   * @param limit - The maximum number of products to retrieve.
   * @returns A promise that resolves to an array of products.
   */
  getProducts(pageNumber?: number, limit?: number): Promise<ProductType[]>;

  /**
   * Retrieves a list of products with the specified seller name.
   * @param sellerName - The name of the seller.
   * @param pageNumber - The page number.
   * @param limit - The maximum number of products to retrieve.
   * @returns A promise that resolves to an array of products.
   */
  getProductsWithSeller(
    sellerName: string,
    pageNumber: number,
    limit: number
  ): Promise<ProductType[]>;

  /**
   * Retrieves a product by its ID.
   * @param id - The ID of the product.
   * @returns A promise that resolves to the product.
   */
  getProduct(id: string): Promise<ProductType>;
}

export default IProductServices;
