import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch7591008Tool } from "@/components/tools/batch-759-1008-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("html-table-to-markdown-converter")!);

export default function Page() {
  const tool = getToolBySlug("html-table-to-markdown-converter")!;
  return (
    <ToolLayout tool={tool}>
      <Batch7591008Tool kind="html-table-to-markdown-converter" />
    </ToolLayout>
  );
}
