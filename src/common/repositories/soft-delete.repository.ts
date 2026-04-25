import { Prisma } from '@prisma/client';

// Minimal contract for Prisma models used in soft delete
type SoftDeleteModel = {
  updateMany: (args: { where: any; data: any }) => Promise<{ count: number }>;
  findUnique: (args: { where: any; select?: any }) => Promise<any | null>;
};

export async function softDelete(
  model: SoftDeleteModel,
  id: string,
): Promise<{ updatedCount: number; existing: { id: string; deletedAt: Date | null } | null }> {
  const result = await model.updateMany({
    where: { id, deletedAt: null },
    data: { deletedAt: new Date() },
  });

  if (result.count === 0) {
    const existing = await model.findUnique({
      where: { id },
      select: { id: true, deletedAt: true },
    });

    return { updatedCount: 0, existing };
  }

  return { updatedCount: result.count, existing: null };
}
