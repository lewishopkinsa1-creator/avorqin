import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { MathTool } from "@/components/tools/math-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("scientific-calculator")!);

export default function Page() {
  const tool = getToolBySlug("scientific-calculator")!;

  return (
    <ToolLayout tool={tool}>
      <MathTool kind="scientific-calculator" />
    </ToolLayout>
  );
}
