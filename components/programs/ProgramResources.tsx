import { Download, Eye } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

type ResourceVideo = { src: string; label: string };

type ProgramResourcesProps = {
  pdfUrl: string;
  pdfLabel: string;
  videos: ResourceVideo[];
};

export default function ProgramResources({ pdfUrl, pdfLabel, videos }: ProgramResourcesProps) {
  return (
    <div className="flex flex-col gap-6 rounded-card border border-navy/10 bg-mist p-7 sm:p-9">
      <SectionHeading eyebrow="Resources" title="Explore This Program" />

      <div className="flex flex-wrap items-center gap-5">
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold font-heading text-green hover:text-green-dark"
        >
          <Eye className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
          View {pdfLabel}
        </a>
        <a
          href={pdfUrl}
          download
          className="inline-flex items-center gap-2 text-sm font-semibold font-heading text-green hover:text-green-dark"
        >
          <Download className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
          Download {pdfLabel}
        </a>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => (
          <div key={video.src} className="flex flex-col gap-3 rounded-card border border-navy/10 bg-white p-4">
            <div className="overflow-hidden rounded-btn bg-navy">
              <video controls preload="metadata" className="aspect-video w-full">
                <source src={video.src} type="video/mp4" />
              </video>
            </div>
            <span className="font-heading text-sm font-bold text-navy">{video.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
