import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { FinanceTool } from "@/components/tools/finance-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("profit-margin-calculator")!);

export default function Page() {
  const tool = getToolBySlug("profit-margin-calculator")!;

  return (
    <ToolLayout tool={tool}>
      <FinanceTool kind="profit-margin-calculator" />
    </ToolLayout>
  );
}
