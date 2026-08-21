import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { ImageTool } from "@/components/tools/image-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("image-to-base64")!);

export default function Page() {
  const tool = getToolBySlug("image-to-base64")!;

  return (
    <ToolLayout tool={tool}>
      <ImageTool kind="image-to-base64" />
    </ToolLayout>
  );
}
