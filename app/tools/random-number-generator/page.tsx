import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { MathTool } from "@/components/tools/math-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("random-number-generator")!);

export default function Page() {
  const tool = getToolBySlug("random-number-generator")!;

  return (
    <ToolLayout tool={tool}>
      <MathTool kind="random-number-generator" />
    </ToolLayout>
  );
}
