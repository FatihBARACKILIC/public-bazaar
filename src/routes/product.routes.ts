import { Express } from "express";
import BaseControllers from "../controllers/base.controllers";
import ProductControllers from "../controllers/product.controllers";
import authenticationMiddleware from "../middlewares/authentication.middleware";
import validationMiddleware from "../middlewares/validation.middleware";
import IProductControllers from "../shared/interfaces/controllers/iProductControllers.interface";
import requestHandlerFunctionTryCatch from "../shared/utils/requestHandlerFunctionTryCatch";
import ProductValidations from "../shared/validations/product.validations";
import BaseRoutes from "./base.routes";
import { API_URL } from "../shared/constant/app.constant";

class ProductRoutes extends BaseRoutes {
  protected readonly router: Express;
  protected readonly controller: BaseControllers & IProductControllers;
  protected readonly validations: ProductValidations;

  constructor(router: Express) {
    super("products");

    this.router = router;
    this.controller = new ProductControllers();
    this.validations = new ProductValidations();

    this.runRoutes();
  }

  protected runRoutes(): void {
    // POST /products
    this.router.post(
      this.routeMainUrl,
      validationMiddleware(this.validations.createProduct),
      authenticationMiddleware,
      requestHandlerFunctionTryCatch(this.controller.createProduct)
    );

    // PUT /products
    this.router.put(
      this.routeMainUrl,
      validationMiddleware(this.validations.updateProduct),
      authenticationMiddleware,
      requestHandlerFunctionTryCatch(this.controller.updateProduct)
    );

    // PATCH /products
    this.router.patch(
      this.routeMainUrl,
      validationMiddleware(this.validations.updateProduct),
      authenticationMiddleware,
      requestHandlerFunctionTryCatch(this.controller.updateProduct)
    );

    // DELETE /products
    this.router.delete(
      this.routeMainUrl,
      validationMiddleware(this.validations.passwordAndId),
      authenticationMiddleware,
      requestHandlerFunctionTryCatch(this.controller.deleteProduct)
    );

    // GET /products
    this.router.get(
      this.routeMainUrl,
      requestHandlerFunctionTryCatch(this.controller.getProducts)
    );

    // GET /products/:username
    this.router.get(
      this.generateSanitizedRouteUrl(":username"),
      requestHandlerFunctionTryCatch(this.controller.getProductsWithSeller)
    );

    // GET /product/:id
    this.router.get(
      `${API_URL}product/:id`,
      requestHandlerFunctionTryCatch(this.controller.getProduct)
    );
  }
}

export default ProductRoutes;
