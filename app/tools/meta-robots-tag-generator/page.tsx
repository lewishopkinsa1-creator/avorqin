import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch201250Tool } from "@/components/tools/batch-201-250-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("meta-robots-tag-generator")!);

export default function Page() {
  const tool = getToolBySlug("meta-robots-tag-generator")!;
  return (
    <ToolLayout tool={tool}>
      <Batch201250Tool kind={"meta-robots-tag-generator"} />
    </ToolLayout>
  );
}
