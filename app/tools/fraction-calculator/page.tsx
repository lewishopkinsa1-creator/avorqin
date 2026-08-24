import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { MathTool } from "@/components/tools/math-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("fraction-calculator")!);

export default function Page() {
  const tool = getToolBySlug("fraction-calculator")!;

  return (
    <ToolLayout tool={tool}>
      <MathTool kind="fraction-calculator" />
    </ToolLayout>
  );
}
