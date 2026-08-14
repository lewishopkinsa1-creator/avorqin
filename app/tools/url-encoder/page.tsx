import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { URLEncoderTool } from "@/components/tools/url-encoder-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("url-encoder")!);

export default function UrlEncoderPage() {
  const tool = getToolBySlug("url-encoder")!;
  return (
    <ToolLayout tool={tool}>
      <URLEncoderTool />
    </ToolLayout>
  );
}
