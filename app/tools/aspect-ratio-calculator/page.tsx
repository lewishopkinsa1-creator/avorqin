import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch5Tool } from "@/components/tools/batch-5-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("aspect-ratio-calculator")!);

export default function Page() {
  const tool = getToolBySlug("aspect-ratio-calculator")!;
  return <ToolLayout tool={tool}><Batch5Tool kind="aspect-ratio-calculator" /></ToolLayout>;
}
