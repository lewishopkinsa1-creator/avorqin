import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { DevDataTool } from "@/components/tools/dev-data-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("json-to-typescript")!);

export default function Page() {
  const tool = getToolBySlug("json-to-typescript")!;

  return (
    <ToolLayout tool={tool}>
      <DevDataTool kind="json-to-typescript" />
    </ToolLayout>
  );
}
