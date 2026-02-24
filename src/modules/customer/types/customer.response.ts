import { AddressResponse } from '../../address/type/address.response';

export type CustomerResponse = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
  addresses?: AddressResponse[];
};
