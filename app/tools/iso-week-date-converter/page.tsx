import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch431450Tool } from "@/components/tools/batch-431-450-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("iso-week-date-converter")!);

export default function Page() {
  const tool = getToolBySlug("iso-week-date-converter")!;
  return (
    <ToolLayout tool={tool}>
      <Batch431450Tool kind={"iso-week-date-converter"} />
    </ToolLayout>
  );
}
