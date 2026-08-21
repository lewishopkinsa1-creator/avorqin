import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { ImageTool } from "@/components/tools/image-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("png-to-jpg")!);

export default function Page() {
  const tool = getToolBySlug("png-to-jpg")!;

  return (
    <ToolLayout tool={tool}>
      <ImageTool kind="png-to-jpg" />
    </ToolLayout>
  );
}
