import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch201250Tool } from "@/components/tools/batch-201-250-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("title-tag-length-checker")!);

export default function Page() {
  const tool = getToolBySlug("title-tag-length-checker")!;
  return (
    <ToolLayout tool={tool}>
      <Batch201250Tool kind={"title-tag-length-checker"} />
    </ToolLayout>
  );
}
