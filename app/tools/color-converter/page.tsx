import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { ColorTool } from "@/components/tools/color-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("color-converter")!);

export default function Page() {
  const tool = getToolBySlug("color-converter")!;

  return (
    <ToolLayout tool={tool}>
      <ColorTool kind="color-converter" />
    </ToolLayout>
  );
}
