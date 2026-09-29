import Badge from "@/components/ui/Badge";

const toneByStatus: Record<string, "green" | "yellow" | "blue" | "navy"> = {
  PENDING: "yellow",
  PAID: "green",
  FAILED: "navy",
};

const labelByStatus: Record<string, string> = {
  PENDING: "Pending",
  PAID: "Paid",
  FAILED: "Failed",
};

export default function PaymentStatusBadge({ status }: { status: string }) {
  return <Badge tone={toneByStatus[status] ?? "navy"}>{labelByStatus[status] ?? status}</Badge>;
}
