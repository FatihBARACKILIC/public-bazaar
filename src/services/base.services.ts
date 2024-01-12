import { PrismaClient } from "@prisma/client";
import PrismaConnection from "../shared/connection/prisma.connection";

abstract class BaseServices {
  protected readonly db: PrismaClient = PrismaConnection.getInstance();
}

export default BaseServices;
