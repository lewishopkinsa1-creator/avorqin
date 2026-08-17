import {
  ToolLayout,
  generateToolMetadata,
} from "@/components/shared/tool-layout";
import { SlugGeneratorTool } from "@/components/tools/slug-generator-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("slug-generator")!);

export default function Page() {
  const tool = getToolBySlug("slug-generator")!;

  return (
    <ToolLayout tool={tool}>
      <SlugGeneratorTool />
    </ToolLayout>
  );
}
