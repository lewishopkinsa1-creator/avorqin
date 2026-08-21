import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { SeoTool } from "@/components/tools/seo-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("keyword-density-checker")!);

export default function Page() {
  const tool = getToolBySlug("keyword-density-checker")!;

  return (
    <ToolLayout tool={tool}>
      <SeoTool kind="keyword-density-checker" />
    </ToolLayout>
  );
}
