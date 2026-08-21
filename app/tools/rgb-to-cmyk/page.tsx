import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { ColorTool } from "@/components/tools/color-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("rgb-to-cmyk")!);

export default function Page() {
  const tool = getToolBySlug("rgb-to-cmyk")!;

  return (
    <ToolLayout tool={tool}>
      <ColorTool kind="rgb-to-cmyk" />
    </ToolLayout>
  );
}
