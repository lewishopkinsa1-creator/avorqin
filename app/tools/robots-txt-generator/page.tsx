import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { SeoTool } from "@/components/tools/seo-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("robots-txt-generator")!);

export default function Page() {
  const tool = getToolBySlug("robots-txt-generator")!;

  return (
    <ToolLayout tool={tool}>
      <SeoTool kind="robots-txt-generator" />
    </ToolLayout>
  );
}
