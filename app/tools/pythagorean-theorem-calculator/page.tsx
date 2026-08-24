import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { MathTool } from "@/components/tools/math-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("pythagorean-theorem-calculator")!);

export default function Page() {
  const tool = getToolBySlug("pythagorean-theorem-calculator")!;

  return (
    <ToolLayout tool={tool}>
      <MathTool kind="pythagorean-theorem-calculator" />
    </ToolLayout>
  );
}
