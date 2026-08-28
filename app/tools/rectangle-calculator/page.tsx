import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch251300Tool } from "@/components/tools/batch-251-300-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("rectangle-calculator")!);

export default function Page() {
  const tool = getToolBySlug("rectangle-calculator")!;
  return (
    <ToolLayout tool={tool}>
      <Batch251300Tool kind={"rectangle-calculator"} />
    </ToolLayout>
  );
}
