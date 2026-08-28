import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch201250Tool } from "@/components/tools/batch-201-250-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("credit-card-minimum-payment-calculator")!);

export default function Page() {
  const tool = getToolBySlug("credit-card-minimum-payment-calculator")!;
  return (
    <ToolLayout tool={tool}>
      <Batch201250Tool kind={"credit-card-minimum-payment-calculator"} />
    </ToolLayout>
  );
}
