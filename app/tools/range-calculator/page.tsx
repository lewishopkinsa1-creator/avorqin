import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch451485Tool } from "@/components/tools/batch-451-485-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("range-calculator")!);

export default function Page() {
  const tool = getToolBySlug("range-calculator")!;
  return (
    <ToolLayout tool={tool}>
      <Batch451485Tool kind={"range-calculator"} />
    </ToolLayout>
  );
}
