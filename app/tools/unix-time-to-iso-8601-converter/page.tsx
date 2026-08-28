import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch431450Tool } from "@/components/tools/batch-431-450-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("unix-time-to-iso-8601-converter")!);

export default function Page() {
  const tool = getToolBySlug("unix-time-to-iso-8601-converter")!;
  return (
    <ToolLayout tool={tool}>
      <Batch431450Tool kind={"unix-time-to-iso-8601-converter"} />
    </ToolLayout>
  );
}
