import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch251300Tool } from "@/components/tools/batch-251-300-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("prime-number-checker")!);

export default function Page() {
  const tool = getToolBySlug("prime-number-checker")!;
  return (
    <ToolLayout tool={tool}>
      <Batch251300Tool kind={"prime-number-checker"} />
    </ToolLayout>
  );
}
