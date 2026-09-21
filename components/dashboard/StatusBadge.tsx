import Badge from "@/components/ui/Badge";

const toneByStatus: Record<string, "green" | "yellow" | "blue" | "navy"> = {
  NEW: "blue",
  READ: "navy",
  IN_PROGRESS: "yellow",
  RESOLVED: "green",
};

const labelByStatus: Record<string, string> = {
  NEW: "New",
  READ: "Read",
  IN_PROGRESS: "In Progress",
  RESOLVED: "Resolved",
};

export default function StatusBadge({ status }: { status: string }) {
  return <Badge tone={toneByStatus[status] ?? "navy"}>{labelByStatus[status] ?? status}</Badge>;
}
