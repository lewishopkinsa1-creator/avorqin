import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch401430Tool } from "@/components/tools/batch-401-430-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("average-order-value-calculator")!);

export default function Page() {
  const tool = getToolBySlug("average-order-value-calculator")!;
  return (
    <ToolLayout tool={tool}>
      <Batch401430Tool kind={"average-order-value-calculator"} />
    </ToolLayout>
  );
}
