import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { FinanceTool } from "@/components/tools/finance-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("commission-calculator")!);

export default function Page() {
  const tool = getToolBySlug("commission-calculator")!;

  return (
    <ToolLayout tool={tool}>
      <FinanceTool kind="commission-calculator" />
    </ToolLayout>
  );
}
