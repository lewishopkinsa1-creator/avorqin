import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch5Tool } from "@/components/tools/batch-5-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("date-difference-calculator")!);

export default function Page() {
  const tool = getToolBySlug("date-difference-calculator")!;
  return <ToolLayout tool={tool}><Batch5Tool kind="date-difference-calculator" /></ToolLayout>;
}
