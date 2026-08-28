import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch251300Tool } from "@/components/tools/batch-251-300-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("probability-calculator")!);

export default function Page() {
  const tool = getToolBySlug("probability-calculator")!;
  return (
    <ToolLayout tool={tool}>
      <Batch251300Tool kind={"probability-calculator"} />
    </ToolLayout>
  );
}
