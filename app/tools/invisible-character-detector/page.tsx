import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch251300Tool } from "@/components/tools/batch-251-300-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("invisible-character-detector")!);

export default function Page() {
  const tool = getToolBySlug("invisible-character-detector")!;
  return (
    <ToolLayout tool={tool}>
      <Batch251300Tool kind={"invisible-character-detector"} />
    </ToolLayout>
  );
}
