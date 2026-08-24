import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { FinanceTool } from "@/components/tools/finance-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("hourly-to-salary-calculator")!);

export default function Page() {
  const tool = getToolBySlug("hourly-to-salary-calculator")!;

  return (
    <ToolLayout tool={tool}>
      <FinanceTool kind="hourly-to-salary-calculator" />
    </ToolLayout>
  );
}
