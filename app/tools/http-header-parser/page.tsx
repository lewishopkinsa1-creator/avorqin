import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch251300Tool } from "@/components/tools/batch-251-300-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("http-header-parser")!);

export default function Page() {
  const tool = getToolBySlug("http-header-parser")!;
  return (
    <ToolLayout tool={tool}>
      <Batch251300Tool kind={"http-header-parser"} />
    </ToolLayout>
  );
}
