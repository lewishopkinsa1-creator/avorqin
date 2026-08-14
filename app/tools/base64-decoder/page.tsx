import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Base64DecoderTool } from "@/components/tools/base64-decoder-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("base64-decoder")!);

export default function Base64DecoderPage() {
  const tool = getToolBySlug("base64-decoder")!;
  return (
    <ToolLayout tool={tool}>
      <Base64DecoderTool />
    </ToolLayout>
  );
}
