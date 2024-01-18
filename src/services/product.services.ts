import NotFoundError from "../shared/error/notFound.error";
import UnauthorizedError from "../shared/error/unauthorized.error";
import IProductServices from "../shared/interfaces/services/iProductServices.interface";
import { CreateProductType, ProductType } from "../shared/types/product.type";
import { TokenType, UserType } from "../shared/types/user.type";
import { bcryptVerify } from "../shared/utils/bcrypt";
import { validate as isUuid } from "uuid";
import BaseServices from "./base.services";

class ProductServices extends BaseServices implements IProductServices {
  private isSeller = (role: string): void => {
    if (role !== "SELLER")
      throw new UnauthorizedError(
        'Only users with the "seller" role can add products.'
      );
  };

  private isSameUser(userId: string, id: string) {
    if (userId !== id)
      throw new UnauthorizedError(
        "You do not have permission to update this product."
      );
  }

  createProduct = async (
    user: TokenType,
    product: CreateProductType
  ): Promise<ProductType> => {
    try {
      this.isSeller(user.role);
      const { name, price, quantity, description, image }: CreateProductType =
        product;

      const newProduct = await this.db.products.create({
        data: { name, price, quantity, description, image, userId: user.id },
      });
      return newProduct;
    } catch (error: unknown) {
      throw error instanceof Error ? error : new Error(error as string);
    }
  };

  updateProduct = async (
    user: TokenType,
    password: string,
    id: string,
    product: Partial<CreateProductType>
  ): Promise<ProductType> => {
    try {
      const oldProduct: ProductType | null = await this.db.products.findUnique({
        where: { id },
      });
      if (!oldProduct) throw new NotFoundError("Product not found");

      this.isSameUser(oldProduct.userId, user.id);

      const seller: UserType | null = await this.db.users.findUnique({
        where: { id: user.id },
      });
      if (!seller) throw new NotFoundError("User not found");

      const isValid = await bcryptVerify(seller.password, password);
      if (!isValid) throw new UnauthorizedError("Invalid password");

      const updatedProduct = await this.db.products.update({
        data: product,
        where: { id },
      });

      return updatedProduct;
    } catch (error: unknown) {
      throw error instanceof Error ? error : new Error(error as string);
    }
  };

  deleteProduct = async (
    user: TokenType,
    password: string,
    id: string,
    product: unknown
  ): Promise<unknown> => {
    try {
      return {} as ProductType;
    } catch (error: unknown) {
      throw error instanceof Error ? error : new Error(error as string);
    }
  };

  getProducts = async (
    pageNumber: number,
    limit: number
  ): Promise<ProductType[]> => {
    try {
      const products = await this.db.products.findMany({
        orderBy: {
          created_at: "desc",
        },
        skip: pageNumber * limit,
        take: limit,
      });

      return products;
    } catch (error: unknown) {
      throw error instanceof Error ? error : new Error(error as string);
    }
  };

  getProductsWithSeller = async (
    sellerName: string,
    pageNumber: number,
    limit: number
  ): Promise<ProductType[]> => {
    try {
      const products = await this.db.products.findMany({
        where: {
          user: {
            username: sellerName,
          },
        },
        orderBy: {
          created_at: "desc",
        },
        skip: pageNumber * limit,
        take: limit,
      });

      return products;
    } catch (error: unknown) {
      throw error instanceof Error ? error : new Error(error as string);
    }
  };

  getProduct = async (id: string): Promise<ProductType> => {
    try {
      if (!isUuid(id)) throw new NotFoundError("Product not found");

      const product: ProductType | null = await this.db.products.findUnique({
        where: { id },
      });

      if (!product) throw new NotFoundError("Product not found");

      return product;
    } catch (error: unknown) {
      throw error instanceof Error ? error : new Error(error as string);
    }
  };
}

export default ProductServices;
