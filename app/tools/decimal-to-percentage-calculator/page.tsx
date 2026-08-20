import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch6Tool } from "@/components/tools/batch-6-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("decimal-to-percentage-calculator")!);

export default function Page() {
  const tool = getToolBySlug("decimal-to-percentage-calculator")!;
  return <ToolLayout tool={tool}><Batch6Tool kind="decimal-to-percentage-calculator" /></ToolLayout>;
}
