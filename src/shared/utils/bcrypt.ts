import bcrypt from "bcrypt";

const bcryptHash = async (password: string): Promise<string> => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

const bcryptVerify = async (
  passwordOfDb: string,
  passwordOfUser: string
): Promise<boolean> => {
  const result = await bcrypt.compare(passwordOfUser, passwordOfDb);
  return result;
};

export { bcryptHash, bcryptVerify };
