import { AddressResponse } from './address.response';

export type CustomerResponse = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
  addresses?: AddressResponse[];
};
