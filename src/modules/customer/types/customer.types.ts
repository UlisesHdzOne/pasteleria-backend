import { Prisma } from '@prisma/client';

export const CUSTOMER_SELECT = {
  id: true,
  firstName: true,
  lastName: true,
  phone: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
} satisfies Prisma.CustomerSelect;

export type CustomerPayload = Prisma.CustomerGetPayload<{
  select: typeof CUSTOMER_SELECT;
}>;

export { Prisma };
