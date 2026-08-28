import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch201250Tool } from "@/components/tools/batch-201-250-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("rule-of-72-calculator")!);

export default function Page() {
  const tool = getToolBySlug("rule-of-72-calculator")!;
  return (
    <ToolLayout tool={tool}>
      <Batch201250Tool kind={"rule-of-72-calculator"} />
    </ToolLayout>
  );
}
