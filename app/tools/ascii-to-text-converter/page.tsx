import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch6Tool } from "@/components/tools/batch-6-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("ascii-to-text-converter")!);

export default function Page() {
  const tool = getToolBySlug("ascii-to-text-converter")!;
  return <ToolLayout tool={tool}><Batch6Tool kind="ascii-to-text-converter" /></ToolLayout>;
}
