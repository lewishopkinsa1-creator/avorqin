import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { PdfExpansionTool } from "@/components/tools/pdf-expansion-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("text-to-pdf")!);

export default function Page() {
  const tool = getToolBySlug("text-to-pdf")!;

  return (
    <ToolLayout tool={tool}>
      <PdfExpansionTool kind="text-to-pdf" />
    </ToolLayout>
  );
}
