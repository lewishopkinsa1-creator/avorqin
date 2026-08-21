import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { PdfTool } from "@/components/tools/pdf-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("remove-pdf-pages")!);

export default function Page() {
  const tool = getToolBySlug("remove-pdf-pages")!;

  return (
    <ToolLayout tool={tool}>
      <PdfTool kind="remove-pdf-pages" />
    </ToolLayout>
  );
}
