import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { ColorTool } from "@/components/tools/color-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("gradient-generator")!);

export default function Page() {
  const tool = getToolBySlug("gradient-generator")!;

  return (
    <ToolLayout tool={tool}>
      <ColorTool kind="gradient-generator" />
    </ToolLayout>
  );
}
