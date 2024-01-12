import { PrismaClient } from "@prisma/client";
import logger from "../utils/logger";

class PrismaConnection {
  private static instance: PrismaClient;

  private constructor() {}

  public static getInstance(): PrismaClient {
    if (!PrismaConnection.instance) {
      logger.info("Database Connected!");
      PrismaConnection.instance = new PrismaClient();
    }
    return PrismaConnection.instance;
  }
}

export default PrismaConnection;
