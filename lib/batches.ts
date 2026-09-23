import { prisma } from "@/lib/prisma";

// Single source of truth for the cohort batch list — every page/form that
// needs to show or validate batch options calls this instead of
// hard-coding "November 2026" etc. in more than one place.
export async function getActiveBatches() {
  return prisma.batch.findMany({
    where: { isActive: true },
    orderBy: { displayOrder: "asc" },
  });
}
