import { NextFunction, Request, Response } from "express";
import BaseServices from "../services/base.services";
import ProductServices from "../services/product.services";
import HttpStatusCode from "../shared/enums/httpStatusCode.enum";
import IProductControllers from "../shared/interfaces/controllers/iProductControllers.interface";
import IProductServices from "../shared/interfaces/services/iProductServices.interface";
import { CreateProductType } from "../shared/types/product.type";
import { TokenType } from "../shared/types/user.type";
import BaseControllers from "./base.controllers";

class ProductControllers
  extends BaseControllers
  implements IProductControllers
{
  protected readonly services: BaseServices & IProductServices;

  constructor() {
    super();

    this.services = new ProductServices();
  }

  createProduct = async (req: Request, res: Response, next: NextFunction) => {
    const {
      _user,
      name,
      price,
      quantity,
      description,
      image,
    }: CreateProductType & { _user: TokenType } = req.body;
    const response = await this.services.createProduct(_user, {
      name,
      price,
      quantity,
      description,
      image,
    });
    res.status(HttpStatusCode.CREATED).json({
      message: "Product Created",
      product: response,
    });
  };

  updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    const {
      _user,
      password,
      id,
      product,
    }: {
      _user: TokenType;
      password: string;
      id: string;
      product: Partial<CreateProductType>;
    } = req.body;
    const response = await this.services.updateProduct(
      _user,
      password,
      id,
      product
    );
    res.status(HttpStatusCode.OK).json({
      message: "Product Updated",
      product: response,
    });
  };

  deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    // TODO:
    throw new Error("Method not implemented.");
  };

  getProducts = async (req: Request, res: Response, next: NextFunction) => {
    const pageNumber = +(req.query.pageNumber ?? 0);
    const limit = +(req.query.limit ?? 10);
    const response = await this.services.getProducts(pageNumber, limit);
    res.status(HttpStatusCode.OK).json(response);
  };

  getProductsWithSeller = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { username } = req.params;
    const pageNumber = +(req.query.pageNumber ?? 0);
    const limit = +(req.query.limit ?? 10);
    const response = await this.services.getProductsWithSeller(
      username,
      pageNumber,
      limit
    );
    res.status(HttpStatusCode.OK).json(response);
  };

  getProduct = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const response = await this.services.getProduct(id);
    res.status(HttpStatusCode.OK).json(response);
  };
}

export default ProductControllers;
