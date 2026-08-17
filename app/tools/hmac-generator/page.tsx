import {
  ToolLayout,
  generateToolMetadata,
} from "@/components/shared/tool-layout";
import { HMACGeneratorTool } from "@/components/tools/hmac-generator-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("hmac-generator")!);

export default function Page() {
  const tool = getToolBySlug("hmac-generator")!;

  return (
    <ToolLayout tool={tool}>
      <HMACGeneratorTool />
    </ToolLayout>
  );
}
