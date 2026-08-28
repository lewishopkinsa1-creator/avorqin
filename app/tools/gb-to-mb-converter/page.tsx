import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch451485Tool } from "@/components/tools/batch-451-485-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("gb-to-mb-converter")!);

export default function Page() {
  const tool = getToolBySlug("gb-to-mb-converter")!;
  return (
    <ToolLayout tool={tool}>
      <Batch451485Tool kind={"gb-to-mb-converter"} />
    </ToolLayout>
  );
}
