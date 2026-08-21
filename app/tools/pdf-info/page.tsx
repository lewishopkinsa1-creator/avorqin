import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { PdfTool } from "@/components/tools/pdf-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("pdf-info")!);

export default function Page() {
  const tool = getToolBySlug("pdf-info")!;

  return (
    <ToolLayout tool={tool}>
      <PdfTool kind="pdf-info" />
    </ToolLayout>
  );
}
