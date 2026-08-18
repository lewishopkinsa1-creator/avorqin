import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch5Tool } from "@/components/tools/batch-5-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("http-status-code-lookup")!);

export default function Page() {
  const tool = getToolBySlug("http-status-code-lookup")!;
  return <ToolLayout tool={tool}><Batch5Tool kind="http-status-code-lookup" /></ToolLayout>;
}
