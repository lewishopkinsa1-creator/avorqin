import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { ColorTool } from "@/components/tools/color-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("hsl-to-hex")!);

export default function Page() {
  const tool = getToolBySlug("hsl-to-hex")!;

  return (
    <ToolLayout tool={tool}>
      <ColorTool kind="hsl-to-hex" />
    </ToolLayout>
  );
}
