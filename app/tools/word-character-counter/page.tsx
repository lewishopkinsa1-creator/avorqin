import {
  ToolLayout,
  generateToolMetadata,
} from "@/components/shared/tool-layout";
import { WordCharacterCounterTool } from "@/components/tools/word-character-counter-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("word-character-counter")!);

export default function Page() {
  const tool = getToolBySlug("word-character-counter")!;

  return (
    <ToolLayout tool={tool}>
      <WordCharacterCounterTool />
    </ToolLayout>
  );
}
