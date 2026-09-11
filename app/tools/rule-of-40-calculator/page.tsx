import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch7591008Tool } from "@/components/tools/batch-759-1008-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("rule-of-40-calculator")!);

export default function Page() {
  const tool = getToolBySlug("rule-of-40-calculator")!;
  return (
    <ToolLayout tool={tool}>
      <Batch7591008Tool kind="rule-of-40-calculator" />
    </ToolLayout>
  );
}
