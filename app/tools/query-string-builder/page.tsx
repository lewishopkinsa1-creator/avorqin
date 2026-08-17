import {
  ToolLayout,
  generateToolMetadata,
} from "@/components/shared/tool-layout";
import { QueryStringBuilderTool } from "@/components/tools/query-string-builder-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("query-string-builder")!);

export default function Page() {
  const tool = getToolBySlug("query-string-builder")!;

  return (
    <ToolLayout tool={tool}>
      <QueryStringBuilderTool />
    </ToolLayout>
  );
}
