import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch651758Tool } from "@/components/tools/batch-651-758-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(
  getToolBySlug("sql-to-json-converter")!
);

export default function Page() {
  const tool = getToolBySlug("sql-to-json-converter")!;

  return (
    <ToolLayout tool={tool}>
      <Batch651758Tool kind="sql-to-json-converter" />
    </ToolLayout>
  );
}
