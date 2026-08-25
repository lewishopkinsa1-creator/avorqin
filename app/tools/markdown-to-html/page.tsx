import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { DevDataTool } from "@/components/tools/dev-data-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("markdown-to-html")!);

export default function Page() {
  const tool = getToolBySlug("markdown-to-html")!;

  return (
    <ToolLayout tool={tool}>
      <DevDataTool kind="markdown-to-html" />
    </ToolLayout>
  );
}
