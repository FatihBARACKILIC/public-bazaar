import BaseServices from "../services/base.services";

/**
 * BaseControllers is an abstract class that serves as the base for all controllers.
 * It provides a common structure and properties for controllers to extend from.
 */
abstract class BaseControllers {
  protected abstract readonly services: BaseServices;
}

export default BaseControllers;
