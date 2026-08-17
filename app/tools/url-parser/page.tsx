import {
  ToolLayout,
  generateToolMetadata,
} from "@/components/shared/tool-layout";
import { URLParserTool } from "@/components/tools/url-parser-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("url-parser")!);

export default function Page() {
  const tool = getToolBySlug("url-parser")!;

  return (
    <ToolLayout tool={tool}>
      <URLParserTool />
    </ToolLayout>
  );
}
