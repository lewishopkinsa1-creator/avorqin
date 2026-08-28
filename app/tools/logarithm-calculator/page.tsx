import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch351400Tool } from "@/components/tools/batch-351-400-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("logarithm-calculator")!);

export default function Page() {
  const tool = getToolBySlug("logarithm-calculator")!;
  return (
    <ToolLayout tool={tool}>
      <Batch351400Tool kind={"logarithm-calculator"} />
    </ToolLayout>
  );
}
