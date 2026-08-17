import {
  ToolLayout,
  generateToolMetadata,
} from "@/components/shared/tool-layout";
import { JWTDecoderTool } from "@/components/tools/jwt-decoder-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("jwt-decoder")!);

export default function JWTDecoderPage() {
  const tool = getToolBySlug("jwt-decoder")!;

  return (
    <ToolLayout tool={tool}>
      <JWTDecoderTool />
    </ToolLayout>
  );
}
