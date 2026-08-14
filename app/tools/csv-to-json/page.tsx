import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { CSVToJSONTool } from "@/components/tools/csv-to-json-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("csv-to-json")!);

export default function CsvToJsonPage() {
  const tool = getToolBySlug("csv-to-json")!;
  return (
    <ToolLayout tool={tool}>
      <CSVToJSONTool />
    </ToolLayout>
  );
}
