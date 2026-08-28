import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch431450Tool } from "@/components/tools/batch-431-450-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("julian-date-converter")!);

export default function Page() {
  const tool = getToolBySlug("julian-date-converter")!;
  return (
    <ToolLayout tool={tool}>
      <Batch431450Tool kind={"julian-date-converter"} />
    </ToolLayout>
  );
}
