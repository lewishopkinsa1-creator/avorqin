import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch7591008Tool } from "@/components/tools/batch-759-1008-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("stair-stringer-calculator")!);

export default function Page() {
  const tool = getToolBySlug("stair-stringer-calculator")!;
  return (
    <ToolLayout tool={tool}>
      <Batch7591008Tool kind="stair-stringer-calculator" />
    </ToolLayout>
  );
}
