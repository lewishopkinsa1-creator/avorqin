import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { PdfTool } from "@/components/tools/pdf-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("pdf-metadata-viewer")!);

export default function Page() {
  const tool = getToolBySlug("pdf-metadata-viewer")!;

  return (
    <ToolLayout tool={tool}>
      <PdfTool kind="pdf-metadata-viewer" />
    </ToolLayout>
  );
}
