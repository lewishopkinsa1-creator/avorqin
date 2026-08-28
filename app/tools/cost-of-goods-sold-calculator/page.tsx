import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch401430Tool } from "@/components/tools/batch-401-430-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("cost-of-goods-sold-calculator")!);

export default function Page() {
  const tool = getToolBySlug("cost-of-goods-sold-calculator")!;
  return (
    <ToolLayout tool={tool}>
      <Batch401430Tool kind={"cost-of-goods-sold-calculator"} />
    </ToolLayout>
  );
}
