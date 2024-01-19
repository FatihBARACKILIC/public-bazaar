import nodemailer from "nodemailer";
import {
  MAIL_HOST,
  MAIL_PASSWORD,
  MAIL_PORT,
  MAIL_USER,
} from "../constant/config.constant";
import { SafeUserType } from "../types/user.type";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import logger from "./logger";

const mail = async (userInfo: SafeUserType) => {
  const transporter = nodemailer.createTransport({
    host: MAIL_HOST,
    port: MAIL_PORT,
    auth: {
      user: MAIL_USER,
      pass: MAIL_PASSWORD,
    },
  });

  try {
    transporter.sendMail(
      {
        from: `<${MAIL_USER}>`,
        to: userInfo.email,
        subject: "Welcome",
        text: `Welcome!\nYou have registered ${userInfo.username}.`,
        html: `<h1>Welcome!</h1>You have registered ${userInfo.username}.`,
      },
      (error: Error | null, info: SMTPTransport.SentMessageInfo) => {
        if (error) logger.error(error);
      }
    );
  } catch (error) {
    throw error instanceof Error ? error : new Error(error as string);
  }
};

export default mail;
