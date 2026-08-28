import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch431450Tool } from "@/components/tools/batch-431-450-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("iso-8601-to-unix-time-converter")!);

export default function Page() {
  const tool = getToolBySlug("iso-8601-to-unix-time-converter")!;
  return (
    <ToolLayout tool={tool}>
      <Batch431450Tool kind={"iso-8601-to-unix-time-converter"} />
    </ToolLayout>
  );
}
