import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { DevDataTool } from "@/components/tools/dev-data-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("html-to-markdown")!);

export default function Page() {
  const tool = getToolBySlug("html-to-markdown")!;

  return (
    <ToolLayout tool={tool}>
      <DevDataTool kind="html-to-markdown" />
    </ToolLayout>
  );
}
