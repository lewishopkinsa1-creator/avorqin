import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch7591008Tool } from "@/components/tools/batch-759-1008-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("median-absolute-deviation-calculator")!);

export default function Page() {
  const tool = getToolBySlug("median-absolute-deviation-calculator")!;
  return (
    <ToolLayout tool={tool}>
      <Batch7591008Tool kind="median-absolute-deviation-calculator" />
    </ToolLayout>
  );
}
