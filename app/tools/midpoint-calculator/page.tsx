import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { MathTool } from "@/components/tools/math-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("midpoint-calculator")!);

export default function Page() {
  const tool = getToolBySlug("midpoint-calculator")!;

  return (
    <ToolLayout tool={tool}>
      <MathTool kind="midpoint-calculator" />
    </ToolLayout>
  );
}
