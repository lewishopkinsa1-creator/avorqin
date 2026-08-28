import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch251300Tool } from "@/components/tools/batch-251-300-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("unicode-escape-converter")!);

export default function Page() {
  const tool = getToolBySlug("unicode-escape-converter")!;
  return (
    <ToolLayout tool={tool}>
      <Batch251300Tool kind={"unicode-escape-converter"} />
    </ToolLayout>
  );
}
