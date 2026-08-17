import {
  ToolLayout,
  generateToolMetadata,
} from "@/components/shared/tool-layout";
import { HexToTextTool } from "@/components/tools/hex-to-text-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("hex-to-text")!);

export default function Page() {
  const tool = getToolBySlug("hex-to-text")!;

  return (
    <ToolLayout tool={tool}>
      <HexToTextTool />
    </ToolLayout>
  );
}
