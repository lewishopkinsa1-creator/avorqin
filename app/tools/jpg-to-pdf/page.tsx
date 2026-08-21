import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { PdfTool } from "@/components/tools/pdf-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("jpg-to-pdf")!);

export default function Page() {
  const tool = getToolBySlug("jpg-to-pdf")!;

  return (
    <ToolLayout tool={tool}>
      <PdfTool kind="jpg-to-pdf" />
    </ToolLayout>
  );
}
