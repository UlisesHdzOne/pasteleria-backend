import { Prisma } from '@prisma/client';
import { FindCustomerQueryDto } from '../dto/find-customer-query.dto';

type SortOrder = 'asc' | 'desc';

const ALLOWED_SORT_FIELDS = ['firstName', 'lastName', 'createdAt'] as const;
type AllowedSortField = (typeof ALLOWED_SORT_FIELDS)[number];

export class CustomerQuery {
  private readonly query: FindCustomerQueryDto;

  constructor(query: FindCustomerQueryDto) {
    this.query = query;
  }

  get where(): Prisma.CustomerWhereInput {
    return {
      ...this.buildStatusFilter(),
      ...this.buildSearchFilter(),
      ...this.buildDateFilter(),
    };
  }

  get orderBy(): Prisma.CustomerOrderByWithRelationInput {
    const { sortBy, sortOrder = 'desc' } = this.query;

    const order: SortOrder =
      sortOrder === 'asc' || sortOrder === 'desc' ? sortOrder : 'desc';

    const safeSortBy: AllowedSortField = ALLOWED_SORT_FIELDS.includes(
      sortBy as AllowedSortField,
    )
      ? (sortBy as AllowedSortField)
      : 'createdAt';

    return { [safeSortBy]: order };
  }

  private buildStatusFilter(): Prisma.CustomerWhereInput {
    const { status = 'active' } = this.query;

    if (status === 'deleted') return { deletedAt: { not: null } };
    if (status === 'all') return {};
    return { deletedAt: null };
  }

  private buildSearchFilter(): Prisma.CustomerWhereInput {
    const { search } = this.query;
    const cleanSearch = search?.trim().replace(/\s+/g, ' ') || undefined;

    if (!cleanSearch) return {};

    const cleanPhoneSearch = cleanSearch.replace(/\D/g, '');

    return {
      OR: [
        {
          firstName: {
            contains: cleanSearch,
            mode: Prisma.QueryMode.insensitive,
          },
        },
        {
          lastName: {
            contains: cleanSearch,
            mode: Prisma.QueryMode.insensitive,
          },
        },
        ...(cleanPhoneSearch
          ? [{ phone: { contains: cleanPhoneSearch } }]
          : []),
      ],
    };
  }

  private buildDateFilter(): Prisma.CustomerWhereInput {
    const { createdFrom, createdTo } = this.query;

    if (!createdFrom && !createdTo) return {};

    return {
      createdAt: {
        ...(createdFrom && { gte: new Date(createdFrom) }),
        ...(createdTo && { lte: new Date(createdTo) }),
      },
    };
  }
}