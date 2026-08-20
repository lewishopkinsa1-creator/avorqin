import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch6Tool } from "@/components/tools/batch-6-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("weight-converter")!);

export default function Page() {
  const tool = getToolBySlug("weight-converter")!;
  return <ToolLayout tool={tool}><Batch6Tool kind="weight-converter" /></ToolLayout>;
}
