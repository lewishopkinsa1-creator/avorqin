import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { JSONValidatorTool } from "@/components/tools/json-validator-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("json-validator")!);

export default function JsonValidatorPage() {
  const tool = getToolBySlug("json-validator")!;
  return (
    <ToolLayout tool={tool}>
      <JSONValidatorTool />
    </ToolLayout>
  );
}
