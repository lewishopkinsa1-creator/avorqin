import {
  ToolLayout,
  generateToolMetadata,
} from "@/components/shared/tool-layout";
import { TextReverserTool } from "@/components/tools/text-reverser-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("text-reverser")!);

export default function Page() {
  const tool = getToolBySlug("text-reverser")!;

  return (
    <ToolLayout tool={tool}>
      <TextReverserTool />
    </ToolLayout>
  );
}
