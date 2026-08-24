import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { FinanceTool } from "@/components/tools/finance-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("cagr-calculator")!);

export default function Page() {
  const tool = getToolBySlug("cagr-calculator")!;

  return (
    <ToolLayout tool={tool}>
      <FinanceTool kind="cagr-calculator" />
    </ToolLayout>
  );
}
