import {
  ToolLayout,
  generateToolMetadata,
} from "@/components/shared/tool-layout";
import { SQLFormatterTool } from "@/components/tools/sql-formatter-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("sql-formatter")!);

export default function SQLFormatterPage() {
  const tool = getToolBySlug("sql-formatter")!;

  return (
    <ToolLayout tool={tool}>
      <SQLFormatterTool />
    </ToolLayout>
  );
}
