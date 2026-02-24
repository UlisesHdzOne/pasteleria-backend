export type DrivenListItem = {
  id: number;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  coursesCount:number;
};

export type DrivenResponse = {
  data: DrivenListItem[];
  meta:DrivenMeta;
};

export type DrivenMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
};

