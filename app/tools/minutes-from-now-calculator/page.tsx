import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch431450Tool } from "@/components/tools/batch-431-450-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("minutes-from-now-calculator")!);

export default function Page() {
  const tool = getToolBySlug("minutes-from-now-calculator")!;
  return (
    <ToolLayout tool={tool}>
      <Batch431450Tool kind={"minutes-from-now-calculator"} />
    </ToolLayout>
  );
}
