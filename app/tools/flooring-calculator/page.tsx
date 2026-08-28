import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch301350Tool } from "@/components/tools/batch-301-350-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("flooring-calculator")!);

export default function Page() {
  const tool = getToolBySlug("flooring-calculator")!;
  return (
    <ToolLayout tool={tool}>
      <Batch301350Tool kind={"flooring-calculator"} />
    </ToolLayout>
  );
}
