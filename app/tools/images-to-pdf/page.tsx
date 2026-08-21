import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { PdfTool } from "@/components/tools/pdf-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("images-to-pdf")!);

export default function Page() {
  const tool = getToolBySlug("images-to-pdf")!;

  return (
    <ToolLayout tool={tool}>
      <PdfTool kind="images-to-pdf" />
    </ToolLayout>
  );
}
