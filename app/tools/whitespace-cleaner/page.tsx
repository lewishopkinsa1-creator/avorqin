import {
  ToolLayout,
  generateToolMetadata,
} from "@/components/shared/tool-layout";
import { WhitespaceCleanerTool } from "@/components/tools/whitespace-cleaner-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("whitespace-cleaner")!);

export default function Page() {
  const tool = getToolBySlug("whitespace-cleaner")!;

  return (
    <ToolLayout tool={tool}>
      <WhitespaceCleanerTool />
    </ToolLayout>
  );
}
