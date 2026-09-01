import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch601650Tool } from "@/components/tools/batch-601-650-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("crown-molding-calculator")!);

export default function Page() {
  const tool = getToolBySlug("crown-molding-calculator")!;
  return (
    <ToolLayout tool={tool}>
      <Batch601650Tool kind={"crown-molding-calculator"} />
    </ToolLayout>
  );
}
