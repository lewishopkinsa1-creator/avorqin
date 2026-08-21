import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { SeoTool } from "@/components/tools/seo-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("schema-markup-generator")!);

export default function Page() {
  const tool = getToolBySlug("schema-markup-generator")!;

  return (
    <ToolLayout tool={tool}>
      <SeoTool kind="schema-markup-generator" />
    </ToolLayout>
  );
}
