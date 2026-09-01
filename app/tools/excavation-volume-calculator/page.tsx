import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch601650Tool } from "@/components/tools/batch-601-650-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("excavation-volume-calculator")!);

export default function Page() {
  const tool = getToolBySlug("excavation-volume-calculator")!;
  return (
    <ToolLayout tool={tool}>
      <Batch601650Tool kind={"excavation-volume-calculator"} />
    </ToolLayout>
  );
}
