import Joi from "joi";

class AuthenticationValidation {
  private username = Joi.string().min(3).max(50).alphanum();
  private email = Joi.string().email().max(250);
  private password = Joi.string()
    .min(8)
    .max(50)
    .regex(/(?=(.*[A-Z]){2})(?=(.*[a-z]){2})(?=(.*\d){2})(?=(.*[\W]){2}).*/)
    .message(
      "Password must contain at least 2 uppercase letters, 2 lowercase letters, 2 digits, and 2 special characters"
    );

  public get login(): Joi.ObjectSchema {
    return Joi.object({
      username: this.username.optional(),
      email: this.email.optional(),
      password: this.password.required(),
    }).xor("username", "email");
  }
}

export default AuthenticationValidation;
