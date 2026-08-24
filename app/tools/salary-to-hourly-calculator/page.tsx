import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { FinanceTool } from "@/components/tools/finance-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("salary-to-hourly-calculator")!);

export default function Page() {
  const tool = getToolBySlug("salary-to-hourly-calculator")!;

  return (
    <ToolLayout tool={tool}>
      <FinanceTool kind="salary-to-hourly-calculator" />
    </ToolLayout>
  );
}
