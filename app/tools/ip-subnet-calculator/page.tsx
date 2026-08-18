import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch5Tool } from "@/components/tools/batch-5-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("ip-subnet-calculator")!);

export default function Page() {
  const tool = getToolBySlug("ip-subnet-calculator")!;
  return <ToolLayout tool={tool}><Batch5Tool kind="ip-subnet-calculator" /></ToolLayout>;
}
