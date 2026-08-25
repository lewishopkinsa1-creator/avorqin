import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { DevDataTool } from "@/components/tools/dev-data-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("json-diff")!);

export default function Page() {
  const tool = getToolBySlug("json-diff")!;

  return (
    <ToolLayout tool={tool}>
      <DevDataTool kind="json-diff" />
    </ToolLayout>
  );
}
