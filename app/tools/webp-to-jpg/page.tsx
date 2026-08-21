import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { ImageTool } from "@/components/tools/image-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("webp-to-jpg")!);

export default function Page() {
  const tool = getToolBySlug("webp-to-jpg")!;

  return (
    <ToolLayout tool={tool}>
      <ImageTool kind="webp-to-jpg" />
    </ToolLayout>
  );
}
