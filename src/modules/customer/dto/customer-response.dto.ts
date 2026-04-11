// dto/customer-response.dto.ts
import { Exclude, Expose, Transform } from 'class-transformer';

@Exclude() // ← Por defecto, excluye todo
export class CustomerResponseDto {
  @Expose() // ← Solo expone esto
  id!: string;

  @Expose()
  @Transform(({ obj }) =>
    [obj.firstName, obj.lastName].filter(Boolean).join(' '),
  )
  fullName!: string; // ← firstName + lastName combinados

  @Expose()
  phone!: string;

  @Expose()
  email!: string | null;

  @Expose()
  createdAt!: Date;

  @Expose()
  updatedAt!: Date;

  // firstName, lastName, avatar, deletedAt NO están expuestos (correcto)
}
