import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Base64EncoderTool } from "@/components/tools/base64-encoder-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("base64-encoder")!);

export default function Base64EncoderPage() {
  const tool = getToolBySlug("base64-encoder")!;
  return (
    <ToolLayout tool={tool}>
      <Base64EncoderTool />
    </ToolLayout>
  );
}
