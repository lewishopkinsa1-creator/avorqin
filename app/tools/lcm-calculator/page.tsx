import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { MathTool } from "@/components/tools/math-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("lcm-calculator")!);

export default function Page() {
  const tool = getToolBySlug("lcm-calculator")!;

  return (
    <ToolLayout tool={tool}>
      <MathTool kind="lcm-calculator" />
    </ToolLayout>
  );
}
