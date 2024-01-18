import Joi from "joi";

class ProductValidations {
  private readonly id = Joi.string().guid({ version: "uuidv4" });
  private readonly name = Joi.string().min(3).max(250);
  private readonly price = Joi.number().min(1);
  private readonly quantity = Joi.number().min(1);
  private readonly description = Joi.string().min(3).max(5000);
  private readonly image = Joi.array().items(Joi.string().uri());

  private readonly password = Joi.string()
    .min(8)
    .max(50)
    .regex(/(?=(.*[A-Z]){2})(?=(.*[a-z]){2})(?=(.*\d){2})(?=(.*[\W]){2}).*/)
    .message(
      "Password must contain at least 2 uppercase letters, 2 lowercase letters, 2 digits, and 2 special characters"
    );

  public get createProduct(): Joi.ObjectSchema {
    return Joi.object({
      name: this.name.required(),
      price: this.price.required(),
      quantity: this.quantity.required(),
      description: this.description.required(),
      image: this.image.required(),
    });
  }

  public get updateProduct(): Joi.ObjectSchema {
    return Joi.object({
      password: this.password.required(),
      id: this.id.required(),
      product: {
        name: this.name.optional(),
        price: this.price.optional(),
        quantity: this.quantity.optional(),
        description: this.description.optional(),
        image: this.image.optional(),
      },
    });
  }

  public get passwordAndId(): Joi.ObjectSchema {
    return Joi.object({
      password: this.password.required(),
      id: this.id.required(),
    });
  }
}

export default ProductValidations;
