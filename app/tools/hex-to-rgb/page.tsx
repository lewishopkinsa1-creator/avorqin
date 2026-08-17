import {
  ToolLayout,
  generateToolMetadata,
} from "@/components/shared/tool-layout";
import { HexToRGBTool } from "@/components/tools/hex-to-rgb-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("hex-to-rgb")!);

export default function Page() {
  const tool = getToolBySlug("hex-to-rgb")!;

  return (
    <ToolLayout tool={tool}>
      <HexToRGBTool />
    </ToolLayout>
  );
}
