import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { PdfTool } from "@/components/tools/pdf-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("rotate-pdf")!);

export default function Page() {
  const tool = getToolBySlug("rotate-pdf")!;

  return (
    <ToolLayout tool={tool}>
      <PdfTool kind="rotate-pdf" />
    </ToolLayout>
  );
}
