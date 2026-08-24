import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { MathTool } from "@/components/tools/math-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("mean-median-mode-calculator")!);

export default function Page() {
  const tool = getToolBySlug("mean-median-mode-calculator")!;

  return (
    <ToolLayout tool={tool}>
      <MathTool kind="mean-median-mode-calculator" />
    </ToolLayout>
  );
}
