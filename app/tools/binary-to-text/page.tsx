import {
  ToolLayout,
  generateToolMetadata,
} from "@/components/shared/tool-layout";
import { BinaryToTextTool } from "@/components/tools/binary-to-text-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("binary-to-text")!);

export default function Page() {
  const tool = getToolBySlug("binary-to-text")!;

  return (
    <ToolLayout tool={tool}>
      <BinaryToTextTool />
    </ToolLayout>
  );
}
