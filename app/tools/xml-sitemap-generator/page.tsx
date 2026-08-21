import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { SeoTool } from "@/components/tools/seo-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("xml-sitemap-generator")!);

export default function Page() {
  const tool = getToolBySlug("xml-sitemap-generator")!;

  return (
    <ToolLayout tool={tool}>
      <SeoTool kind="xml-sitemap-generator" />
    </ToolLayout>
  );
}
