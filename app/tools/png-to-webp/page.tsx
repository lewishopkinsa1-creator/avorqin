import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { ImageTool } from "@/components/tools/image-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("png-to-webp")!);

export default function Page() {
  const tool = getToolBySlug("png-to-webp")!;

  return (
    <ToolLayout tool={tool}>
      <ImageTool kind="png-to-webp" />
    </ToolLayout>
  );
}
