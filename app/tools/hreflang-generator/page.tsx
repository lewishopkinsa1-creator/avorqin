import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { SeoTool } from "@/components/tools/seo-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("hreflang-generator")!);

export default function Page() {
  const tool = getToolBySlug("hreflang-generator")!;

  return (
    <ToolLayout tool={tool}>
      <SeoTool kind="hreflang-generator" />
    </ToolLayout>
  );
}
