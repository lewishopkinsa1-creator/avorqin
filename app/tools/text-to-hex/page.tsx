import {
  ToolLayout,
  generateToolMetadata,
} from "@/components/shared/tool-layout";
import { TextToHexTool } from "@/components/tools/text-to-hex-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("text-to-hex")!);

export default function Page() {
  const tool = getToolBySlug("text-to-hex")!;

  return (
    <ToolLayout tool={tool}>
      <TextToHexTool />
    </ToolLayout>
  );
}
