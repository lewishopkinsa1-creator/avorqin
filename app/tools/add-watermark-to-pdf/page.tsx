import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { PdfTool } from "@/components/tools/pdf-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("add-watermark-to-pdf")!);

export default function Page() {
  const tool = getToolBySlug("add-watermark-to-pdf")!;

  return (
    <ToolLayout tool={tool}>
      <PdfTool kind="add-watermark-to-pdf" />
    </ToolLayout>
  );
}
