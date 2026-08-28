import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch431450Tool } from "@/components/tools/batch-431-450-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("hours-from-now-calculator")!);

export default function Page() {
  const tool = getToolBySlug("hours-from-now-calculator")!;
  return (
    <ToolLayout tool={tool}>
      <Batch431450Tool kind={"hours-from-now-calculator"} />
    </ToolLayout>
  );
}
