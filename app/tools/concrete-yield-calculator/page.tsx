import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch601650Tool } from "@/components/tools/batch-601-650-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("concrete-yield-calculator")!);

export default function Page() {
  const tool = getToolBySlug("concrete-yield-calculator")!;
  return (
    <ToolLayout tool={tool}>
      <Batch601650Tool kind={"concrete-yield-calculator"} />
    </ToolLayout>
  );
}
