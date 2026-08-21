import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { ImageTool } from "@/components/tools/image-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("image-dimensions-checker")!);

export default function Page() {
  const tool = getToolBySlug("image-dimensions-checker")!;

  return (
    <ToolLayout tool={tool}>
      <ImageTool kind="image-dimensions-checker" />
    </ToolLayout>
  );
}
