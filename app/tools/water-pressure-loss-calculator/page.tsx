import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch651758Tool } from "@/components/tools/batch-651-758-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(
  getToolBySlug("water-pressure-loss-calculator")!
);

export default function Page() {
  const tool = getToolBySlug("water-pressure-loss-calculator")!;

  return (
    <ToolLayout tool={tool}>
      <Batch651758Tool kind="water-pressure-loss-calculator" />
    </ToolLayout>
  );
}
