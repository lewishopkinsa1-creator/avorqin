import {
  ToolLayout,
  generateToolMetadata,
} from "@/components/shared/tool-layout";
import { TextToBinaryTool } from "@/components/tools/text-to-binary-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("text-to-binary")!);

export default function Page() {
  const tool = getToolBySlug("text-to-binary")!;

  return (
    <ToolLayout tool={tool}>
      <TextToBinaryTool />
    </ToolLayout>
  );
}
