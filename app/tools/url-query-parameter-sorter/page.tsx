import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch7591008Tool } from "@/components/tools/batch-759-1008-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("url-query-parameter-sorter")!);

export default function Page() {
  const tool = getToolBySlug("url-query-parameter-sorter")!;
  return (
    <ToolLayout tool={tool}>
      <Batch7591008Tool kind="url-query-parameter-sorter" />
    </ToolLayout>
  );
}
