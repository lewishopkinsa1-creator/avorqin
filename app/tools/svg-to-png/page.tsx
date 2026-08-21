import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { ImageTool } from "@/components/tools/image-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("svg-to-png")!);

export default function Page() {
  const tool = getToolBySlug("svg-to-png")!;

  return (
    <ToolLayout tool={tool}>
      <ImageTool kind="svg-to-png" />
    </ToolLayout>
  );
}
