import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { MathTool } from "@/components/tools/math-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("quadratic-formula-calculator")!);

export default function Page() {
  const tool = getToolBySlug("quadratic-formula-calculator")!;

  return (
    <ToolLayout tool={tool}>
      <MathTool kind="quadratic-formula-calculator" />
    </ToolLayout>
  );
}
