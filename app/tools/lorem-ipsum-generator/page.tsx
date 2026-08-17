import {
  ToolLayout,
  generateToolMetadata,
} from "@/components/shared/tool-layout";
import { LoremIpsumGeneratorTool } from "@/components/tools/lorem-ipsum-generator-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("lorem-ipsum-generator")!);

export default function Page() {
  const tool = getToolBySlug("lorem-ipsum-generator")!;

  return (
    <ToolLayout tool={tool}>
      <LoremIpsumGeneratorTool />
    </ToolLayout>
  );
}
