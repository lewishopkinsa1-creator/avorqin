import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch5Tool } from "@/components/tools/batch-5-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("age-calculator")!);

export default function Page() {
  const tool = getToolBySlug("age-calculator")!;
  return <ToolLayout tool={tool}><Batch5Tool kind="age-calculator" /></ToolLayout>;
}
