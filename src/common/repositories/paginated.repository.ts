import { PaginatedResponse } from '../interfaces/paginated-response.interface';
import { PaginationQuery } from '../query/pagination-query';
import { plainToInstance } from 'class-transformer';

// Contrato genérico para cualquier modelo Prisma
type PrismaModel<TWhere, TSelect, TOrder, TResult> = {
  findMany: (args: {
    where?: TWhere;
    orderBy?: TOrder;
    skip?: number;
    take?: number;
    select?: TSelect;
  }) => Promise<TResult[]>;
  count: (args: { where?: TWhere }) => Promise<number>;
};

export async function findPaginated<
  TResponse,
  TWhere,
  TSelect,
  TOrder,
  TResult,
>(
  model: PrismaModel<TWhere, TSelect, TOrder, TResult>,
  pagination: PaginationQuery<TWhere>,
  orderBy: TOrder,
  mapperSelect: TSelect,
  ResponseDto: new () => TResponse,
): Promise<PaginatedResponse<TResponse>> {
  const [items, total] = await Promise.all([
    model.findMany({
      where: pagination.paginationWhere,
      orderBy,
      skip: pagination.skip,
      take: pagination.take,
      select: mapperSelect,
    }),
    model.count({ where: pagination.paginationWhere }),
  ]);

  return {
    data: plainToInstance(ResponseDto, items as unknown[], {
      excludeExtraneousValues: true,
    }),
    meta: pagination.buildMeta(total),
  };
}
