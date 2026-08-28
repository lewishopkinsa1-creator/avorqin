import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch431450Tool } from "@/components/tools/batch-431-450-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("time-zone-offset-converter")!);

export default function Page() {
  const tool = getToolBySlug("time-zone-offset-converter")!;
  return (
    <ToolLayout tool={tool}>
      <Batch431450Tool kind={"time-zone-offset-converter"} />
    </ToolLayout>
  );
}
