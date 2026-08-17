import {
  ToolLayout,
  generateToolMetadata,
} from "@/components/shared/tool-layout";
import { RandomStringGeneratorTool } from "@/components/tools/random-string-generator-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("random-string-generator")!);

export default function Page() {
  const tool = getToolBySlug("random-string-generator")!;

  return (
    <ToolLayout tool={tool}>
      <RandomStringGeneratorTool />
    </ToolLayout>
  );
}
