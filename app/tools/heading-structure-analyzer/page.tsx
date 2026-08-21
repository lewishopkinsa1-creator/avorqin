import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { SeoTool } from "@/components/tools/seo-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("heading-structure-analyzer")!);

export default function Page() {
  const tool = getToolBySlug("heading-structure-analyzer")!;

  return (
    <ToolLayout tool={tool}>
      <SeoTool kind="heading-structure-analyzer" />
    </ToolLayout>
  );
}
