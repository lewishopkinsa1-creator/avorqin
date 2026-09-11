import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch7591008Tool } from "@/components/tools/batch-759-1008-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("csv-to-yaml-converter")!);

export default function Page() {
  const tool = getToolBySlug("csv-to-yaml-converter")!;
  return (
    <ToolLayout tool={tool}>
      <Batch7591008Tool kind="csv-to-yaml-converter" />
    </ToolLayout>
  );
}
