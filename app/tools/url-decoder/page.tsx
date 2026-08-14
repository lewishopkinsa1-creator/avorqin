import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { URLDecoderTool } from "@/components/tools/url-decoder-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("url-decoder")!);

export default function UrlDecoderPage() {
  const tool = getToolBySlug("url-decoder")!;
  return (
    <ToolLayout tool={tool}>
      <URLDecoderTool />
    </ToolLayout>
  );
}
