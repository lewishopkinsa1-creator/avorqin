import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch451485Tool } from "@/components/tools/batch-451-485-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("coefficient-of-variation-calculator")!);

export default function Page() {
  const tool = getToolBySlug("coefficient-of-variation-calculator")!;
  return (
    <ToolLayout tool={tool}>
      <Batch451485Tool kind={"coefficient-of-variation-calculator"} />
    </ToolLayout>
  );
}
