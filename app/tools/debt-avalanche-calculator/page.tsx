import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch201250Tool } from "@/components/tools/batch-201-250-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("debt-avalanche-calculator")!);

export default function Page() {
  const tool = getToolBySlug("debt-avalanche-calculator")!;
  return (
    <ToolLayout tool={tool}>
      <Batch201250Tool kind={"debt-avalanche-calculator"} />
    </ToolLayout>
  );
}
