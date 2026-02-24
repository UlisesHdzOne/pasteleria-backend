import {
  AddressResponse,
  CreateAddress,
  UpdateAddress,
} from "../types/address";
import apiClient from "./axiosConfig";

export const addressService = {
  async findByCustomer(customerId: string): Promise<AddressResponse[]> {
    const { data } = await apiClient.get(`/address/customer/${customerId}`);
    return data;
  },

  async create(
    customerId: string,
    payload: CreateAddress,
  ): Promise<AddressResponse> {
    const { data } = await apiClient.post(`/address/${customerId}`, payload);
    return data;
  },

  async update(id: string, payload: UpdateAddress): Promise<AddressResponse> {
    const { data } = await apiClient.patch(`/address/${id}`, payload);
    return data;
  },

  async remove(id: string): Promise<{ message: string }> {
    const { data } = await apiClient.delete(`/address/${id}`);
    return data;
  },
};
