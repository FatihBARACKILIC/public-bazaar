interface RegisterType {
  firstName: string;
  lastName?: string;
  username: string;
  email: string;
  password: string;
  role: unknown;
}

interface UserType {
  id: string;
  firstName: string;
  lastName: string | null | undefined;
  username: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
  role: unknown;
}

export { RegisterType, UserType };
