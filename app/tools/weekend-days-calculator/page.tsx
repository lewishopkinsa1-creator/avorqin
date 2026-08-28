import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch431450Tool } from "@/components/tools/batch-431-450-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("weekend-days-calculator")!);

export default function Page() {
  const tool = getToolBySlug("weekend-days-calculator")!;
  return (
    <ToolLayout tool={tool}>
      <Batch431450Tool kind={"weekend-days-calculator"} />
    </ToolLayout>
  );
}
