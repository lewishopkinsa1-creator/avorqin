import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch7591008Tool } from "@/components/tools/batch-759-1008-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("potential-energy-calculator")!);

export default function Page() {
  const tool = getToolBySlug("potential-energy-calculator")!;
  return (
    <ToolLayout tool={tool}>
      <Batch7591008Tool kind="potential-energy-calculator" />
    </ToolLayout>
  );
}
