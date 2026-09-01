import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch601650Tool } from "@/components/tools/batch-601-650-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("foundation-concrete-calculator")!);

export default function Page() {
  const tool = getToolBySlug("foundation-concrete-calculator")!;
  return (
    <ToolLayout tool={tool}>
      <Batch601650Tool kind={"foundation-concrete-calculator"} />
    </ToolLayout>
  );
}
