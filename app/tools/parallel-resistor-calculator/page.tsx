import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch351400Tool } from "@/components/tools/batch-351-400-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("parallel-resistor-calculator")!);

export default function Page() {
  const tool = getToolBySlug("parallel-resistor-calculator")!;
  return (
    <ToolLayout tool={tool}>
      <Batch351400Tool kind={"parallel-resistor-calculator"} />
    </ToolLayout>
  );
}
