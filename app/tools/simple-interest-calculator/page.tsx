import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { FinanceTool } from "@/components/tools/finance-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("simple-interest-calculator")!);

export default function Page() {
  const tool = getToolBySlug("simple-interest-calculator")!;

  return (
    <ToolLayout tool={tool}>
      <FinanceTool kind="simple-interest-calculator" />
    </ToolLayout>
  );
}
