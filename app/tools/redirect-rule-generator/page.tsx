import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch201250Tool } from "@/components/tools/batch-201-250-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("redirect-rule-generator")!);

export default function Page() {
  const tool = getToolBySlug("redirect-rule-generator")!;
  return (
    <ToolLayout tool={tool}>
      <Batch201250Tool kind={"redirect-rule-generator"} />
    </ToolLayout>
  );
}
