import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch451485Tool } from "@/components/tools/batch-451-485-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("meters-to-feet-converter")!);

export default function Page() {
  const tool = getToolBySlug("meters-to-feet-converter")!;
  return (
    <ToolLayout tool={tool}>
      <Batch451485Tool kind={"meters-to-feet-converter"} />
    </ToolLayout>
  );
}
