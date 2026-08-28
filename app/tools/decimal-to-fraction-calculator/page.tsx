import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch451485Tool } from "@/components/tools/batch-451-485-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("decimal-to-fraction-calculator")!);

export default function Page() {
  const tool = getToolBySlug("decimal-to-fraction-calculator")!;
  return (
    <ToolLayout tool={tool}>
      <Batch451485Tool kind={"decimal-to-fraction-calculator"} />
    </ToolLayout>
  );
}
