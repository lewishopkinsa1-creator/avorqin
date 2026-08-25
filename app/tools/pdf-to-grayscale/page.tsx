import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { PdfExpansionTool } from "@/components/tools/pdf-expansion-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("pdf-to-grayscale")!);

export default function Page() {
  const tool = getToolBySlug("pdf-to-grayscale")!;

  return (
    <ToolLayout tool={tool}>
      <PdfExpansionTool kind="pdf-to-grayscale" />
    </ToolLayout>
  );
}
