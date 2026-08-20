import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch6Tool } from "@/components/tools/batch-6-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("data-rate-converter")!);

export default function Page() {
  const tool = getToolBySlug("data-rate-converter")!;
  return <ToolLayout tool={tool}><Batch6Tool kind="data-rate-converter" /></ToolLayout>;
}
