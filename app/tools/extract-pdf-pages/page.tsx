import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { PdfTool } from "@/components/tools/pdf-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("extract-pdf-pages")!);

export default function Page() {
  const tool = getToolBySlug("extract-pdf-pages")!;

  return (
    <ToolLayout tool={tool}>
      <PdfTool kind="extract-pdf-pages" />
    </ToolLayout>
  );
}
