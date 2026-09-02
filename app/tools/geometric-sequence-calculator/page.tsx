import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch651758Tool } from "@/components/tools/batch-651-758-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(
  getToolBySlug("geometric-sequence-calculator")!
);

export default function Page() {
  const tool = getToolBySlug("geometric-sequence-calculator")!;

  return (
    <ToolLayout tool={tool}>
      <Batch651758Tool kind="geometric-sequence-calculator" />
    </ToolLayout>
  );
}
