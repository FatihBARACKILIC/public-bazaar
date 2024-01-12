import BaseServices from "../services/base.services";

abstract class BaseController {
  protected abstract readonly services: BaseServices;
}

export default BaseController;
