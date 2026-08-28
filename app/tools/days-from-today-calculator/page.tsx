import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch431450Tool } from "@/components/tools/batch-431-450-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("days-from-today-calculator")!);

export default function Page() {
  const tool = getToolBySlug("days-from-today-calculator")!;
  return (
    <ToolLayout tool={tool}>
      <Batch431450Tool kind={"days-from-today-calculator"} />
    </ToolLayout>
  );
}
