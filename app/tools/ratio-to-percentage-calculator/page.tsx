import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch451485Tool } from "@/components/tools/batch-451-485-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("ratio-to-percentage-calculator")!);

export default function Page() {
  const tool = getToolBySlug("ratio-to-percentage-calculator")!;
  return (
    <ToolLayout tool={tool}>
      <Batch451485Tool kind={"ratio-to-percentage-calculator"} />
    </ToolLayout>
  );
}
