import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { SeoTool } from "@/components/tools/seo-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("serp-preview")!);

export default function Page() {
  const tool = getToolBySlug("serp-preview")!;

  return (
    <ToolLayout tool={tool}>
      <SeoTool kind="serp-preview" />
    </ToolLayout>
  );
}
