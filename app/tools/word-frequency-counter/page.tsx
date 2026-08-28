import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch251300Tool } from "@/components/tools/batch-251-300-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("word-frequency-counter")!);

export default function Page() {
  const tool = getToolBySlug("word-frequency-counter")!;
  return (
    <ToolLayout tool={tool}>
      <Batch251300Tool kind={"word-frequency-counter"} />
    </ToolLayout>
  );
}
