import { readFile } from "node:fs/promises";
import path from "node:path";
import { verifyDownloadToken } from "@/lib/download-token";
import { apiError } from "@/lib/api-response";

const RESOURCE_ID = "strategic-brief-download";
// Deliberately outside public/ — this is the only route that can reach it,
// and only with a valid, unexpired token from a completed lead submission.
const FILE_PATH = path.join(process.cwd(), "private", "resources", "ai-training-india-strategic-brief.pdf");
const FILE_NAME = "SLSSDTR-Why-India-Needs-AI-Training-and-Education.pdf";

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token");
  if (!token || !verifyDownloadToken(token, RESOURCE_ID)) {
    return apiError(
      "UNAUTHORIZED",
      "This download link is invalid or has expired. Please submit the form again."
    );
  }

  const file = await readFile(FILE_PATH);
  return new Response(new Uint8Array(file), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${FILE_NAME}"`,
      "Cache-Control": "no-store",
    },
  });
}
