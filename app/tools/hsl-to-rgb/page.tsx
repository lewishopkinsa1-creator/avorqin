import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { ColorTool } from "@/components/tools/color-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("hsl-to-rgb")!);

export default function Page() {
  const tool = getToolBySlug("hsl-to-rgb")!;

  return (
    <ToolLayout tool={tool}>
      <ColorTool kind="hsl-to-rgb" />
    </ToolLayout>
  );
}
