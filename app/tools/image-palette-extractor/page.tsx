import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch486500Tool } from "@/components/tools/batch-486-500-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("image-palette-extractor")!);

export default function Page() {
  const tool = getToolBySlug("image-palette-extractor")!;
  return (
    <ToolLayout tool={tool}>
      <Batch486500Tool kind={"image-palette-extractor"} />
    </ToolLayout>
  );
}
