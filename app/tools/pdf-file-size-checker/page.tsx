import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { PdfExpansionTool } from "@/components/tools/pdf-expansion-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("pdf-file-size-checker")!);

export default function Page() {
  const tool = getToolBySlug("pdf-file-size-checker")!;

  return (
    <ToolLayout tool={tool}>
      <PdfExpansionTool kind="pdf-file-size-checker" />
    </ToolLayout>
  );
}
