import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { ImageTool } from "@/components/tools/image-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("image-compressor")!);

export default function Page() {
  const tool = getToolBySlug("image-compressor")!;

  return (
    <ToolLayout tool={tool}>
      <ImageTool kind="image-compressor" />
    </ToolLayout>
  );
}
