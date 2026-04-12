import { PaginatedMeta } from '../interfaces/paginated-response.interface';

export class PaginationQuery<TWhere> {
  constructor(
    private readonly where: TWhere,
    private readonly page: number,
    private readonly limit: number,
  ) {}

  get skip(): number {
    return (this.page - 1) * this.limit;
  }

  get take(): number {
    return this.limit;
  }

  get paginationWhere(): TWhere {
    return this.where;
  }

  buildMeta(total: number): PaginatedMeta {
    const totalPages = Math.ceil(total / this.limit);

    return {
      page: this.page,
      limit: this.limit,
      total,
      totalPages,
      hasNext: this.page < totalPages,
      hasPrev: this.page > 1,
    };
  }
}
