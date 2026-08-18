import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch5Tool } from "@/components/tools/batch-5-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("rem-to-px-converter")!);

export default function Page() {
  const tool = getToolBySlug("rem-to-px-converter")!;
  return <ToolLayout tool={tool}><Batch5Tool kind="rem-to-px-converter" /></ToolLayout>;
}
