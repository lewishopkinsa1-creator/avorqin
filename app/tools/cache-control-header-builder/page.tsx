import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch7591008Tool } from "@/components/tools/batch-759-1008-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("cache-control-header-builder")!);

export default function Page() {
  const tool = getToolBySlug("cache-control-header-builder")!;
  return (
    <ToolLayout tool={tool}>
      <Batch7591008Tool kind="cache-control-header-builder" />
    </ToolLayout>
  );
}
