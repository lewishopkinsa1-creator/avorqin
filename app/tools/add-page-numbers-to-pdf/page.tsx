import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { PdfTool } from "@/components/tools/pdf-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("add-page-numbers-to-pdf")!);

export default function Page() {
  const tool = getToolBySlug("add-page-numbers-to-pdf")!;

  return (
    <ToolLayout tool={tool}>
      <PdfTool kind="add-page-numbers-to-pdf" />
    </ToolLayout>
  );
}
