import {
  ToolLayout,
  generateToolMetadata,
} from "@/components/shared/tool-layout";
import { MarkdownPreviewerTool } from "@/components/tools/markdown-previewer-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("markdown-previewer")!);

export default function Page() {
  const tool = getToolBySlug("markdown-previewer")!;

  return (
    <ToolLayout tool={tool}>
      <MarkdownPreviewerTool />
    </ToolLayout>
  );
}
