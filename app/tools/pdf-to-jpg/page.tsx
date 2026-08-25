import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { PdfExpansionTool } from "@/components/tools/pdf-expansion-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("pdf-to-jpg")!);

export default function Page() {
  const tool = getToolBySlug("pdf-to-jpg")!;

  return (
    <ToolLayout tool={tool}>
      <PdfExpansionTool kind="pdf-to-jpg" />
    </ToolLayout>
  );
}
