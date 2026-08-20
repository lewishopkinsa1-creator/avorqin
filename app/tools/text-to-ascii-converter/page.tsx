import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch6Tool } from "@/components/tools/batch-6-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("text-to-ascii-converter")!);

export default function Page() {
  const tool = getToolBySlug("text-to-ascii-converter")!;
  return <ToolLayout tool={tool}><Batch6Tool kind="text-to-ascii-converter" /></ToolLayout>;
}
