import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { SeoTool } from "@/components/tools/seo-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("faq-schema-generator")!);

export default function Page() {
  const tool = getToolBySlug("faq-schema-generator")!;

  return (
    <ToolLayout tool={tool}>
      <SeoTool kind="faq-schema-generator" />
    </ToolLayout>
  );
}
