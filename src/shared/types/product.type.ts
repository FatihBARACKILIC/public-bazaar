import { Decimal } from "@prisma/client/runtime/library";

type CreateProductType = {
  name: string;
  price: Decimal;
  quantity: number;
  description: string;
  image: string[];
};

type ProductType = CreateProductType & {
  id: string;
  created_at?: Date;
  updated_at?: Date;
  isActive: boolean;
  userId: string;
};

export { CreateProductType, ProductType };
