import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch601650Tool } from "@/components/tools/batch-601-650-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("ready-mix-concrete-cost-calculator")!);

export default function Page() {
  const tool = getToolBySlug("ready-mix-concrete-cost-calculator")!;
  return (
    <ToolLayout tool={tool}>
      <Batch601650Tool kind={"ready-mix-concrete-cost-calculator"} />
    </ToolLayout>
  );
}
