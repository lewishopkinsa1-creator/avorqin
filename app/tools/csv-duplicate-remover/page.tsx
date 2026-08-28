import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch201250Tool } from "@/components/tools/batch-201-250-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("csv-duplicate-remover")!);

export default function Page() {
  const tool = getToolBySlug("csv-duplicate-remover")!;
  return (
    <ToolLayout tool={tool}>
      <Batch201250Tool kind={"csv-duplicate-remover"} />
    </ToolLayout>
  );
}
