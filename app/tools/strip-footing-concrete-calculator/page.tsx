import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch601650Tool } from "@/components/tools/batch-601-650-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("strip-footing-concrete-calculator")!);

export default function Page() {
  const tool = getToolBySlug("strip-footing-concrete-calculator")!;
  return (
    <ToolLayout tool={tool}>
      <Batch601650Tool kind={"strip-footing-concrete-calculator"} />
    </ToolLayout>
  );
}
