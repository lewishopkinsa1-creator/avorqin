import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch5Tool } from "@/components/tools/batch-5-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("percentage-calculator")!);

export default function Page() {
  const tool = getToolBySlug("percentage-calculator")!;
  return <ToolLayout tool={tool}><Batch5Tool kind="percentage-calculator" /></ToolLayout>;
}
