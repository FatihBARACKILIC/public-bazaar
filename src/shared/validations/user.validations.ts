import Joi from "joi";

class UserValidations {
  private name = Joi.string()
    .min(3)
    .max(50)
    .regex(/^[A-Za-z]+$/)
    .message("Name can only contain letters.");
  private username = Joi.string().min(3).max(50).alphanum();
  private email = Joi.string().email().max(250);
  private password = Joi.string()
    .min(8)
    .max(50)
    .regex(/(?=(.*[A-Z]){2})(?=(.*[a-z]){2})(?=(.*\d){2})(?=(.*[\W]){2}).*/)
    .message(
      "Password must contain at least 2 uppercase letters, 2 lowercase letters, 2 digits, and 2 special characters"
    );
  private role = Joi.string().valid("USER", "SELLER");

  public get createUser(): Joi.ObjectSchema {
    return Joi.object({
      firstName: this.name.required(),
      lastName: this.name.optional(),
      username: this.username.required(),
      email: this.email.required(),
      password: this.password.required(),
      role: this.role.optional(),
    });
  }

  public get updateUser(): Joi.ObjectSchema {
    return Joi.object({
      password: this.password.required(),
      user: {
        firstName: this.name.optional(),
        lastName: this.name.optional(),
        username: this.username.optional(),
        email: this.email.optional(),
        password: this.password.optional(),
        role: this.role.optional(),
      },
    });
  }

  public get onlyPassword(): Joi.ObjectSchema {
    return Joi.object({
      password: this.password.required(),
    });
  }
}

export default UserValidations;
