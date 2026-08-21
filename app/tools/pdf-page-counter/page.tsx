import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { PdfTool } from "@/components/tools/pdf-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("pdf-page-counter")!);

export default function Page() {
  const tool = getToolBySlug("pdf-page-counter")!;

  return (
    <ToolLayout tool={tool}>
      <PdfTool kind="pdf-page-counter" />
    </ToolLayout>
  );
}
