import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch651758Tool } from "@/components/tools/batch-651-758-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(
  getToolBySlug("json-to-sql-converter")!
);

export default function Page() {
  const tool = getToolBySlug("json-to-sql-converter")!;

  return (
    <ToolLayout tool={tool}>
      <Batch651758Tool kind="json-to-sql-converter" />
    </ToolLayout>
  );
}
