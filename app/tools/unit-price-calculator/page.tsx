import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch201250Tool } from "@/components/tools/batch-201-250-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("unit-price-calculator")!);

export default function Page() {
  const tool = getToolBySlug("unit-price-calculator")!;
  return (
    <ToolLayout tool={tool}>
      <Batch201250Tool kind={"unit-price-calculator"} />
    </ToolLayout>
  );
}
