import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch5Tool } from "@/components/tools/batch-5-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("em-to-px-converter")!);

export default function Page() {
  const tool = getToolBySlug("em-to-px-converter")!;
  return <ToolLayout tool={tool}><Batch5Tool kind="em-to-px-converter" /></ToolLayout>;
}
