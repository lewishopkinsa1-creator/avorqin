import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch601650Tool } from "@/components/tools/batch-601-650-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("aggregate-calculator")!);

export default function Page() {
  const tool = getToolBySlug("aggregate-calculator")!;
  return (
    <ToolLayout tool={tool}>
      <Batch601650Tool kind={"aggregate-calculator"} />
    </ToolLayout>
  );
}
