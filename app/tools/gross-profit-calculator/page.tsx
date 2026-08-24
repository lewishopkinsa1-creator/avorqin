import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { FinanceTool } from "@/components/tools/finance-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("gross-profit-calculator")!);

export default function Page() {
  const tool = getToolBySlug("gross-profit-calculator")!;

  return (
    <ToolLayout tool={tool}>
      <FinanceTool kind="gross-profit-calculator" />
    </ToolLayout>
  );
}
