import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch5Tool } from "@/components/tools/batch-5-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("user-agent-parser")!);

export default function Page() {
  const tool = getToolBySlug("user-agent-parser")!;
  return <ToolLayout tool={tool}><Batch5Tool kind="user-agent-parser" /></ToolLayout>;
}
