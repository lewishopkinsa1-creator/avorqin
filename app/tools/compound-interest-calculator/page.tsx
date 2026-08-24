import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { FinanceTool } from "@/components/tools/finance-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("compound-interest-calculator")!);

export default function Page() {
  const tool = getToolBySlug("compound-interest-calculator")!;

  return (
    <ToolLayout tool={tool}>
      <FinanceTool kind="compound-interest-calculator" />
    </ToolLayout>
  );
}
