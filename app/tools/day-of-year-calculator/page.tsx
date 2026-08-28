import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch431450Tool } from "@/components/tools/batch-431-450-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("day-of-year-calculator")!);

export default function Page() {
  const tool = getToolBySlug("day-of-year-calculator")!;
  return (
    <ToolLayout tool={tool}>
      <Batch431450Tool kind={"day-of-year-calculator"} />
    </ToolLayout>
  );
}
