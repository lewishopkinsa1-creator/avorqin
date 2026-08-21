import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { ColorTool } from "@/components/tools/color-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("shades-and-tints-generator")!);

export default function Page() {
  const tool = getToolBySlug("shades-and-tints-generator")!;

  return (
    <ToolLayout tool={tool}>
      <ColorTool kind="shades-and-tints-generator" />
    </ToolLayout>
  );
}
