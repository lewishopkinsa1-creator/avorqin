import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch451485Tool } from "@/components/tools/batch-451-485-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("kilometers-to-miles-converter")!);

export default function Page() {
  const tool = getToolBySlug("kilometers-to-miles-converter")!;
  return (
    <ToolLayout tool={tool}>
      <Batch451485Tool kind={"kilometers-to-miles-converter"} />
    </ToolLayout>
  );
}
