import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch5Tool } from "@/components/tools/batch-5-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("url-slug-decoder")!);

export default function Page() {
  const tool = getToolBySlug("url-slug-decoder")!;
  return <ToolLayout tool={tool}><Batch5Tool kind="url-slug-decoder" /></ToolLayout>;
}
