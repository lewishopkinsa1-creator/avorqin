import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { JSONFormatterTool } from "@/components/tools/json-formatter-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("json-formatter")!);

export default function JsonFormatterPage() {
  const tool = getToolBySlug("json-formatter")!;
  return (
    <ToolLayout tool={tool}>
      <JSONFormatterTool />
    </ToolLayout>
  );
}
