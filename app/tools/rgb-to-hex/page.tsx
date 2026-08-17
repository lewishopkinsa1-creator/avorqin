import {
  ToolLayout,
  generateToolMetadata,
} from "@/components/shared/tool-layout";
import { RGBToHexTool } from "@/components/tools/rgb-to-hex-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("rgb-to-hex")!);

export default function Page() {
  const tool = getToolBySlug("rgb-to-hex")!;

  return (
    <ToolLayout tool={tool}>
      <RGBToHexTool />
    </ToolLayout>
  );
}
