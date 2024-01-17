type CreateUserType = {
  firstName: string;
  lastName?: string;
  username: string;
  email: string;
  password: string;
  role: "USER" | "SELLER";
};

type UserType = {
  id: string;
  firstName: string;
  lastName: string | null;
  username: string;
  email: string;
  password: string;
  created_at?: Date;
  updated_at?: Date;
  role: "USER" | "SELLER";
  isActive: boolean;
};

type SafeUserType = {
  id: string;
  firstName: string;
  lastName: string | null;
  username: string;
  email: string;
  created_at?: Date;
  updated_at?: Date;
  role: "USER" | "SELLER";
  isActive: boolean;
};

type LoginType = {
  username?: string;
  email?: string;
  password: string;
};

type TokenType = {
  id: string;
  username: string;
  email: string;
  role: "USER" | "SELLER";
};

export type { CreateUserType, LoginType, SafeUserType, TokenType, UserType };
