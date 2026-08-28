import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch201250Tool } from "@/components/tools/batch-201-250-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("csv-to-tsv")!);

export default function Page() {
  const tool = getToolBySlug("csv-to-tsv")!;
  return (
    <ToolLayout tool={tool}>
      <Batch201250Tool kind={"csv-to-tsv"} />
    </ToolLayout>
  );
}
