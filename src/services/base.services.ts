import { PrismaClient } from "@prisma/client";
import PrismaConnection from "../shared/connection/prisma.connection";

/**
 * BaseServices is an abstract class that provides a base implementation for services in the application.
 * It contains a protected property 'db' which is an instance of PrismaClient.
 */
abstract class BaseServices {
  protected readonly db: PrismaClient = PrismaConnection.getInstance();
}

export default BaseServices;
