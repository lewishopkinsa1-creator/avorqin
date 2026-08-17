import {
  ToolLayout,
  generateToolMetadata,
} from "@/components/shared/tool-layout";
import { TextDiffCheckerTool } from "@/components/tools/text-diff-checker-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("text-diff-checker")!);

export default function Page() {
  const tool = getToolBySlug("text-diff-checker")!;

  return (
    <ToolLayout tool={tool}>
      <TextDiffCheckerTool />
    </ToolLayout>
  );
}
