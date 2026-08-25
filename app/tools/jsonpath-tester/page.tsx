import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { DevDataTool } from "@/components/tools/dev-data-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("jsonpath-tester")!);

export default function Page() {
  const tool = getToolBySlug("jsonpath-tester")!;

  return (
    <ToolLayout tool={tool}>
      <DevDataTool kind="jsonpath-tester" />
    </ToolLayout>
  );
}
