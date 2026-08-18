import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch5Tool } from "@/components/tools/batch-5-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("px-to-rem-converter")!);

export default function Page() {
  const tool = getToolBySlug("px-to-rem-converter")!;
  return <ToolLayout tool={tool}><Batch5Tool kind="px-to-rem-converter" /></ToolLayout>;
}
