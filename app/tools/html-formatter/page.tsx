import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { HTMLFormatterTool } from "@/components/tools/html-formatter-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("html-formatter")!);

export default function HtmlFormatterPage() {
  const tool = getToolBySlug("html-formatter")!;
  return (
    <ToolLayout tool={tool}>
      <HTMLFormatterTool />
    </ToolLayout>
  );
}
