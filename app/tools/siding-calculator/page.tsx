import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch601650Tool } from "@/components/tools/batch-601-650-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("siding-calculator")!);

export default function Page() {
  const tool = getToolBySlug("siding-calculator")!;
  return (
    <ToolLayout tool={tool}>
      <Batch601650Tool kind={"siding-calculator"} />
    </ToolLayout>
  );
}
