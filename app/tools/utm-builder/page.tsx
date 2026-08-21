import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { SeoTool } from "@/components/tools/seo-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("utm-builder")!);

export default function Page() {
  const tool = getToolBySlug("utm-builder")!;

  return (
    <ToolLayout tool={tool}>
      <SeoTool kind="utm-builder" />
    </ToolLayout>
  );
}
