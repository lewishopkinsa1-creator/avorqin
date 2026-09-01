import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch601650Tool } from "@/components/tools/batch-601-650-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("trench-volume-calculator")!);

export default function Page() {
  const tool = getToolBySlug("trench-volume-calculator")!;
  return (
    <ToolLayout tool={tool}>
      <Batch601650Tool kind={"trench-volume-calculator"} />
    </ToolLayout>
  );
}
