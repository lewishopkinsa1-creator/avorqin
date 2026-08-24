import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { FinanceTool } from "@/components/tools/finance-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("loan-calculator")!);

export default function Page() {
  const tool = getToolBySlug("loan-calculator")!;

  return (
    <ToolLayout tool={tool}>
      <FinanceTool kind="loan-calculator" />
    </ToolLayout>
  );
}
