import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { PdfTool } from "@/components/tools/pdf-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("png-to-pdf")!);

export default function Page() {
  const tool = getToolBySlug("png-to-pdf")!;

  return (
    <ToolLayout tool={tool}>
      <PdfTool kind="png-to-pdf" />
    </ToolLayout>
  );
}
