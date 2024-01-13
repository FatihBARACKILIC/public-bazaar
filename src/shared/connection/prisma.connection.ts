import { PrismaClient } from "@prisma/client";
import logger from "../utils/logger";

/**
 * Singleton class for managing the Prisma connection.
 */
class PrismaConnection {
  private static instance: PrismaClient;

  private constructor() {}

  /**
   * Returns the instance of the Prisma client.
   * If the instance does not exist, it creates a new instance and returns it.
   * @returns The Prisma client instance.
   */
  public static getInstance(): PrismaClient {
    if (!PrismaConnection.instance) {
      logger.info("Database Connected!");
      PrismaConnection.instance = new PrismaClient();
    }
    return PrismaConnection.instance;
  }
}

export default PrismaConnection;
