import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { ColorTool } from "@/components/tools/color-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("rgb-to-hsl")!);

export default function Page() {
  const tool = getToolBySlug("rgb-to-hsl")!;

  return (
    <ToolLayout tool={tool}>
      <ColorTool kind="rgb-to-hsl" />
    </ToolLayout>
  );
}
