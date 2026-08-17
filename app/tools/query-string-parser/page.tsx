import {
  ToolLayout,
  generateToolMetadata,
} from "@/components/shared/tool-layout";
import { QueryStringParserTool } from "@/components/tools/query-string-parser-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("query-string-parser")!);

export default function Page() {
  const tool = getToolBySlug("query-string-parser")!;

  return (
    <ToolLayout tool={tool}>
      <QueryStringParserTool />
    </ToolLayout>
  );
}
