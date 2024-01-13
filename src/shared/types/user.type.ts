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
};

type UpdateUserType = Partial<CreateUserType>;

export type { CreateUserType, UpdateUserType, UserType };
