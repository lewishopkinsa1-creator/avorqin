import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { MathTool } from "@/components/tools/math-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("standard-deviation-calculator")!);

export default function Page() {
  const tool = getToolBySlug("standard-deviation-calculator")!;

  return (
    <ToolLayout tool={tool}>
      <MathTool kind="standard-deviation-calculator" />
    </ToolLayout>
  );
}
