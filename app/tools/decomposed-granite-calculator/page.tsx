import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch601650Tool } from "@/components/tools/batch-601-650-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("decomposed-granite-calculator")!);

export default function Page() {
  const tool = getToolBySlug("decomposed-granite-calculator")!;
  return (
    <ToolLayout tool={tool}>
      <Batch601650Tool kind={"decomposed-granite-calculator"} />
    </ToolLayout>
  );
}
