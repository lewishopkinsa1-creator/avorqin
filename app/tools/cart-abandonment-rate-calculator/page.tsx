import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch401430Tool } from "@/components/tools/batch-401-430-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("cart-abandonment-rate-calculator")!);

export default function Page() {
  const tool = getToolBySlug("cart-abandonment-rate-calculator")!;
  return (
    <ToolLayout tool={tool}>
      <Batch401430Tool kind={"cart-abandonment-rate-calculator"} />
    </ToolLayout>
  );
}
