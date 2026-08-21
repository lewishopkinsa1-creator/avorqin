import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { SeoTool } from "@/components/tools/seo-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("open-graph-preview")!);

export default function Page() {
  const tool = getToolBySlug("open-graph-preview")!;

  return (
    <ToolLayout tool={tool}>
      <SeoTool kind="open-graph-preview" />
    </ToolLayout>
  );
}
