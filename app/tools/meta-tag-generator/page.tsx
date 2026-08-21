import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { SeoTool } from "@/components/tools/seo-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("meta-tag-generator")!);

export default function Page() {
  const tool = getToolBySlug("meta-tag-generator")!;

  return (
    <ToolLayout tool={tool}>
      <SeoTool kind="meta-tag-generator" />
    </ToolLayout>
  );
}
