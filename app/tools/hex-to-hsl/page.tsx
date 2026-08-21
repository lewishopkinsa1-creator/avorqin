import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { ColorTool } from "@/components/tools/color-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("hex-to-hsl")!);

export default function Page() {
  const tool = getToolBySlug("hex-to-hsl")!;

  return (
    <ToolLayout tool={tool}>
      <ColorTool kind="hex-to-hsl" />
    </ToolLayout>
  );
}
