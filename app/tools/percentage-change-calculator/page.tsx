import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch5Tool } from "@/components/tools/batch-5-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("percentage-change-calculator")!);

export default function Page() {
  const tool = getToolBySlug("percentage-change-calculator")!;
  return <ToolLayout tool={tool}><Batch5Tool kind="percentage-change-calculator" /></ToolLayout>;
}
