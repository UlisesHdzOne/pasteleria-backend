import type {
  CreateCustomerDTO,
  Customer,
  FetchCustomersParams,
  FetchCustomersResult,
  UpdateCustomerDTO,
} from "../context/customer/types";
import apiClient from "./axiosConfig";

export const customerService = {
  async findAll(params?: FetchCustomersParams): Promise<FetchCustomersResult> {
    const query = new URLSearchParams();
    if (params?.search) query.append("search", params.search);
    if (params?.page) query.append("page", String(params.page));
    if (params?.limit) query.append("limit", String(params.limit));
    if (params?.isActive !== undefined)
      query.append("isActive", String(params.isActive));

    const { data } = await apiClient.get(`/customer?${query.toString()}`);
    return data as FetchCustomersResult;
  },

  async findById(id: string): Promise<Customer> {
    const { data } = await apiClient.get(`/customer/${id}`);
    return data;
  },

  async create(payload: CreateCustomerDTO): Promise<Customer> {
    const { data } = await apiClient.post("/customer", payload);
    return data;
  },

  async update(id: string, payload: UpdateCustomerDTO): Promise<Customer> {
    const { data } = await apiClient.patch(`/customer/${id}`, payload);
    return data;
  },

  async remove(id: string): Promise<{ message: string }> {
    const { data } = await apiClient.delete(`/customer/${id}`);
    return data;
  },
};
