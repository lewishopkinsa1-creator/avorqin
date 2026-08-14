import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { CSSFormatterTool } from "@/components/tools/css-formatter-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("css-formatter")!);

export default function CssFormatterPage() {
  const tool = getToolBySlug("css-formatter")!;
  return (
    <ToolLayout tool={tool}>
      <CSSFormatterTool />
    </ToolLayout>
  );
}
